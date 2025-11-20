import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DiscountService } from 'src/policy/discount/discount.service';
import { PriceService } from 'src/policy/price/price.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAgencyOrderDto, OrderQueries } from './dto';
import { PromotionService } from 'src/policy/promotion/promotion.service';
import { WarehouseInventoryService } from 'src/evm-staff/warehouse-inventory/warehouse-inventory.service';
import { MotorbikeService } from 'src/vehicle/electric-motorbike/motorbike.service';
import { OrderStatus } from './types';
import { CreditLineService } from 'src/admin/credit-line/credit-line.service';

@Injectable()
export class OrderRestockService {
  constructor(
    private discountService: DiscountService,
    private pricePolicyService: PriceService,
    private promotionService: PromotionService,
    private inventoryService: WarehouseInventoryService,
    private motorbikeService: MotorbikeService,
    private creditLineService: CreditLineService,
    private prisma: PrismaService,
  ) {}

  async createOrderRestock(createOrderDto: CreateAgencyOrderDto) {
    await this.checkCredit(createOrderDto.agencyId);
    //Create order with no subtotal and item quantity
    const createOrder = await this.prisma.agency_Order.create({
      data: {
        creditChecked: false,
        itemQuantity: createOrderDto.orderItems.length,
        orderType: createOrderDto.orderType,
        agencyId: createOrderDto.agencyId,
        subtotal: 0,
      },
    });

    for (const orderItem of createOrderDto.orderItems) {
      await this.inventoryService.checkInventory(
        orderItem.motorbikeId,
        orderItem.warehouseId,
        orderItem.colorId,
        orderItem.quantity,
      );
    }
    //Insert order item to order_items table
    for (const orderItem of createOrderDto.orderItems) {
      const motorbikeData = await this.motorbikeService.getMotorbikePrice(
        orderItem.motorbikeId,
      );
      const motorbikeColor = await this.motorbikeService.getMotorbikeColor(
        orderItem.motorbikeId,
        orderItem.colorId,
      );
      let discountTotal: number = 0;
      let promotionTotal: number = 0;
      let wholesalePrice: number = motorbikeData.price;
      const currentDate = new Date();

      //Get price policy information
      const pricePolicy =
        await this.pricePolicyService.getPricePolicyAgencyAndMotorbike(
          createOrderDto.agencyId,
          orderItem.motorbikeId,
        );

      if (pricePolicy) wholesalePrice = pricePolicy.wholesalePrice;

      //Discount policy check and calculate
      if (orderItem.discountId) {
        const discountData = await this.discountService.getDiscountPrice(
          orderItem.discountId,
        );
        if (discountData.status === 'INACTIVE')
          throw new BadRequestException('Discount is inactive!');
        if (currentDate > discountData.endAt)
          throw new BadRequestException('Discount is expired!');
        if (orderItem.quantity < discountData.min_quantity)
          throw new BadRequestException(
            `This discount is required at least ${discountData.min_quantity} of motorbike to have the usage`,
          );
        // Calculate price of order item when apply discount
        discountTotal = this.calculatePriceWithSpecialDeal(
          wholesalePrice,
          discountData.valueType,
          discountData.value,
        );
      }

      //Promotion policy check and calculate
      if (orderItem.promotionId) {
        const promotion = await this.promotionService.getPromotionPrice(
          orderItem.promotionId,
        );
        if (promotion.status === 'INACTIVE')
          throw new BadRequestException('Promotion is inactive!');
        if (currentDate > promotion.endAt)
          throw new BadRequestException('Promotion is expired!');
        // Calculate price of order item when apply promotion
        promotionTotal = this.calculatePriceWithSpecialDeal(
          wholesalePrice,
          promotion.valueType,
          promotion.value,
        );
      }
      // Calculate final price
      const finalPrice =
        (wholesalePrice - (discountTotal + promotionTotal)) *
        orderItem.quantity;

      await this.prisma.order_Items.create({
        data: {
          basePrice: motorbikeData.price,
          quantity: orderItem.quantity,
          discountTotal: discountTotal,
          promotionTotal: promotionTotal,
          finalPrice: finalPrice < 0 ? 0 : finalPrice,
          wholesalePrice: wholesalePrice,
          electricMotorbikeId: orderItem.motorbikeId,
          colorId: motorbikeColor.colorId,
          promotionId: orderItem.promotionId ?? null,
          discountId: orderItem.discountId ?? null,
          pricePolicyId: pricePolicy ? pricePolicy.id : null,
          warehouseId: orderItem.warehouseId,
          orderId: createOrder.id,
        },
      });
    }

    //Get all order items of order and update order
    const orderItems = await this.prisma.order_Items.findMany({
      where: { orderId: createOrder.id },
    });
    //Calculate all item price
    const subtotal = orderItems.reduce((total, item) => {
      return total + item.finalPrice;
    }, 0);
    //Update subtotal, item quantity in order
    const updatedOrder = await this.prisma.agency_Order.update({
      where: {
        id: createOrder.id,
      },
      data: {
        subtotal: subtotal,
        itemQuantity: orderItems.length,
      },
      include: {
        orderItems: true,
      },
    });
    //Check order deferred subtotal with credit limit
    if (updatedOrder.orderType === 'DEFERRED') {
      await this.checkOverCreditLimit(
        updatedOrder.agencyId,
        updatedOrder.subtotal,
        updatedOrder.id,
      );
    }
    return updatedOrder;
  }

  //Check credit line is blocked or not
  async checkCredit(agencyId: number) {
    const creditLine =
      await this.creditLineService.getCreditLineByAgencyId(agencyId);
    if (creditLine.isBlocked)
      throw new BadRequestException('Your credit line has been blocked.');
  }

  // Check over credit limit
  async checkOverCreditLimit(
    agencyId: number,
    subtotal: number,
    orderId: number,
  ) {
    const creditLine =
      await this.creditLineService.getCreditLineByAgencyId(agencyId);
    if (!creditLine) throw new BadRequestException('Not found credit line');
    if (creditLine.creditLimit <= subtotal) {
      await this.deleteOrder(orderId);
      throw new BadRequestException(
        'Your order is over credit limit please try with smaller amount',
      );
    }
    await this.creditLineService.minusCreditLimit(agencyId, subtotal);
    return;
  }

  private calculatePriceWithSpecialDeal(
    wholesalePrice: number,
    type: string,
    valueType: number,
  ) {
    switch (type) {
      case 'FIXED':
        return valueType;
      case 'PERCENT':
        return wholesalePrice * (valueType / 100);
      default:
        return 0;
    }
  }

  async getListOrdersAgency(agencyId: number, orderQuery: OrderQueries) {
    const skipData = (orderQuery.page - 1) * orderQuery.limit;
    const filters: object[] = [];
    if (orderQuery.status) {
      filters.push({ status: orderQuery.status });
    }
    const listData = await this.prisma.agency_Order.findMany({
      skip: skipData,
      take: orderQuery.limit,
      where: {
        AND: [
          {
            agencyId: agencyId,
          },
          ...filters,
        ],
      },
      select: {
        id: true,
        orderType: true,
        creditChecked: true,
        itemQuantity: true,
        subtotal: true,
        orderAt: true,
        status: true,
        orderItems: true,
      },
      orderBy: {
        id: orderQuery.sort === 'newest' ? 'desc' : 'asc',
      },
    });
    const totalOrders = await this.prisma.agency_Order.count({
      where: {
        AND: [
          {
            agencyId: agencyId,
          },
          ...filters,
        ],
      },
    });
    return {
      listData,
      paginationInfo: {
        page: orderQuery.page,
        limit: orderQuery.limit,
        total: totalOrders,
        totalPages: Math.ceil(totalOrders / orderQuery.limit),
      },
    };
  }

  async getTotalOrderAgency(agencyId: number) {
    return await this.prisma.agency_Order.count({
      where: { agencyId: agencyId },
    });
  }

  async getOrderItemDetail(orderId: number) {
    const data = await this.prisma.order_Items.findUnique({
      where: {
        id: orderId,
      },
      include: {
        color: {
          select: {
            id: true,
            colorType: true,
          },
        },
        electricMotorbike: {
          select: {
            id: true,
            name: true,
          },
        },
        warehouse: true,
        promotion: {
          select: {
            id: true,
            name: true,
            value: true,
            valueType: true,
          },
        },
        discountPolicy: {
          select: {
            id: true,
            name: true,
            type: true,
            value: true,
            valueType: true,
          },
        },
      },
    });
    if (!data) throw new NotFoundException('Not found order!');
    return data;
  }

  async updateOrderStatusToAccepted(orderId: number) {
    const isUpdatedToPending = await this.prisma.agency_Order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (isUpdatedToPending && isUpdatedToPending.status !== OrderStatus.DRAFT)
      throw new BadRequestException(
        'This order already in process so you can not update anymore.',
      );
    const updatedData = await this.prisma.agency_Order.update({
      where: {
        id: orderId,
      },
      data: {
        status: OrderStatus.PENDING,
      },
    });
    return updatedData;
  }

  async deleteOrder(orderId: number) {
    const orderRestock = await this.prisma.agency_Order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: true,
      },
    });
    if (!orderRestock) throw new NotFoundException('Not found the order');
    if (orderRestock.status !== OrderStatus.DRAFT)
      throw new BadRequestException(
        'This order already in process so you can not delete anymore. Contact to EVM staff to canceled.',
      );
    await this.prisma.order_Items.deleteMany({
      where: {
        orderId: orderId,
      },
    });
    await this.prisma.agency_Order.delete({
      where: { id: orderId },
    });
    await this.creditLineService.addCreditLimit(
      orderRestock.agencyId,
      orderRestock.subtotal,
    );
    return;
  }

  async getOrderDetail(orderId: number) {
    const data = await this.prisma.agency_Order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
      },
    });
    if (!data) throw new NotFoundException('Not found order!');
    return data;
  }

  async updateCheckedOrder(orderId: number) {
    const updatedData = await this.prisma.agency_Order.update({
      where: { id: orderId },
      data: {
        creditChecked: true,
      },
    });
    return updatedData;
  }
}
