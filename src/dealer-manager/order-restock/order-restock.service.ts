import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DiscountService } from 'src/policy/discount/discount.service';
import { PriceService } from 'src/policy/price/price.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBillOrder, CreateOrderDto, OrderQueries } from './dto';
import { PromotionService } from 'src/policy/promotion/promotion.service';
import { WarehouseInventoryService } from 'src/evm-staff/warehouse-inventory/warehouse-inventory.service';
import { MotorbikeService } from 'src/vehicle/electric-motorbike/motorbike.service';
import { OrderStatus } from './types';

@Injectable()
export class OrderRestockService {
  constructor(
    private discountService: DiscountService,
    private pricePolicyService: PriceService,
    private promotionService: PromotionService,
    private inventoryService: WarehouseInventoryService,
    private motorbikeService: MotorbikeService,
    private prisma: PrismaService,
  ) {}

  async createOrderRestock(createOrderDto: CreateOrderDto) {
    const pricePolicy =
      await this.pricePolicyService.getPricePolicyAgencyAndMotorbike(
        createOrderDto.agencyId,
        createOrderDto.motorbikeId,
      );
    let discountTotal: number = 0;
    let promotionTotal: number = 0;
    if (createOrderDto.discountId) {
      const discountData = await this.discountService.getDiscountPrice(
        createOrderDto.discountId,
      );
      discountTotal = this.calculatePriceWithSpecialDeal(
        pricePolicy.wholesalePrice,
        discountData.valueType,
        discountData.value,
      );
    }
    if (createOrderDto.promotionId) {
      const promotion = await this.promotionService.getPromotionPrice(
        createOrderDto.promotionId,
      );
      promotionTotal = this.calculatePriceWithSpecialDeal(
        pricePolicy.wholesalePrice,
        promotion.valueType,
        promotion.value,
      );
    }
    await this.inventoryUpdate(
      createOrderDto.motorbikeId,
      createOrderDto.warehouseId,
      createOrderDto.quantity,
    );
    const finalPrice =
      pricePolicy.wholesalePrice - (discountTotal + promotionTotal);
    const subtotal = finalPrice * createOrderDto.quantity;
    const motorbikeData = await this.motorbikeService.getMotorbikePrice(
      createOrderDto.motorbikeId,
    );
    const basePrice = motorbikeData.price;

    const createdData = await this.prisma.agency_Order.create({
      data: {
        basePrice: basePrice,
        quantity: createOrderDto.quantity,
        discountTotal: discountTotal,
        promotionTotal: promotionTotal,
        finalPrice: finalPrice,
        subtotal: subtotal,
        wholesalePrice: pricePolicy.wholesalePrice,
        agencyId: createOrderDto.agencyId,
        electricMotorbikeId: createOrderDto.motorbikeId,
        promotionId: createOrderDto.promotionId ?? null,
        discountId: createOrderDto.discountId ?? null,
        pricePolicyId: pricePolicy.id,
        warehouseId: createOrderDto.warehouseId,
      },
      select: {
        basePrice: true,
        quantity: true,
        wholesalePrice: true,
        discountTotal: true,
        promotionTotal: true,
        finalPrice: true,
        subtotal: true,
        orderAt: true,
        status: true,
      },
    });
    return createdData;
  }

  async inventoryUpdate(
    motorbikeId: number,
    warehouseId: number,
    requestQuantity: number,
  ) {
    const inventory = await this.inventoryService.getInventoryDetail(
      motorbikeId,
      warehouseId,
    );
    if (requestQuantity > inventory.quantity)
      throw new BadRequestException(
        `Your request quantity ${requestQuantity} is over the warehouse quantity ${inventory.quantity}`,
      );
    const restQuantity = inventory.quantity - requestQuantity;
    await this.inventoryService.updateInventoryQuantity(
      motorbikeId,
      warehouseId,
      restQuantity,
    );
  }

  calculatePriceWithSpecialDeal(
    wholesalePrice: number,
    type: string,
    valueType: number,
  ) {
    switch (type) {
      case 'FIXED':
        return wholesalePrice - valueType;
      case 'PERCENT':
        return wholesalePrice * (valueType / 100);
      default:
        return 0;
    }
  }

  async createOrderBill(orderId: number, createBillDto: CreateBillOrder) {
    const order = await this.prisma.agency_Order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!order)
      throw new NotFoundException('Can not found the order. Please try again!');
    if (order.status === OrderStatus.CANCELED)
      throw new BadRequestException(
        'Your order has canceled so you can not create bill.',
      );
    const isBillExisted = await this.prisma.agency_Bill.findUnique({
      where: {
        agencyOrderId: orderId,
      },
    });
    if (isBillExisted)
      throw new BadRequestException('This order already has bill!');
    const createdData = await this.prisma.agency_Bill.create({
      data: {
        agencyOrderId: orderId,
        amount: order.subtotal,
        type: createBillDto.type,
      },
    });
    return createdData;
  }
  async getListOrdersAgency(agencyId: number, orderQuery: OrderQueries) {
    const skipData = (orderQuery.page - 1) * orderQuery.limit;
    const listData = await this.prisma.agency_Order.findMany({
      skip: skipData,
      take: orderQuery.limit,
      where: orderQuery.status ? { status: orderQuery.status } : {},
    });
    return {
      listData,
      paginationInfo: {
        page: orderQuery.page,
        limit: orderQuery.limit,
        total: await this.getTotalOrderAgency(agencyId),
      },
    };
  }

  async getTotalOrderAgency(agencyId: number) {
    return await this.prisma.agency_Order.count({
      where: { agencyId: agencyId },
    });
  }

  async getOrderDetail(orderId: number) {
    const data = await this.prisma.agency_Order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        agencyBill: true,
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

  async updateOrderStatusToPending(orderId: number) {
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
    const orderRestock = await this.getOrderDetail(orderId);
    if (orderRestock && orderRestock.status !== OrderStatus.DRAFT)
      throw new BadRequestException(
        'This order already in process so you can not delete anymore. Contact to EVM staff to canceled.',
      );
    await this.prisma.agency_Order.delete({
      where: {
        id: orderId,
      },
    });

    const inventory = await this.inventoryService.getInventoryDetail(
      orderRestock.electricMotorbikeId,
      orderRestock.warehouseId,
    );

    const inventoryUpdateQuantity = inventory.quantity + orderRestock.quantity;
    await this.inventoryUpdate(
      orderRestock.electricMotorbikeId,
      orderRestock.warehouseId,
      inventoryUpdateQuantity,
    );

    return;
  }
}
