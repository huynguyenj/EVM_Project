import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderManageQueries, UpdateOrderStock } from './dto';
import { OrderRestockService } from 'src/dealer-manager/order-restock/order-restock.service';
import { OrderStatus } from 'src/dealer-manager/order-restock/types';
import { WarehouseInventoryService } from '../warehouse-inventory/warehouse-inventory.service';
import { CreditLineService } from 'src/admin/credit-line/credit-line.service';

@Injectable()
export class OrderRestockManagementService {
  constructor(
    private orderRestockService: OrderRestockService,
    private warehouseInventoryService: WarehouseInventoryService,
    private creditLineService: CreditLineService,
    private prisma: PrismaService,
  ) {}

  async getListOrder(orderManageQueries: OrderManageQueries) {
    const skipData = (orderManageQueries.page - 1) * orderManageQueries.limit;
    const filters: any[] = [];
    if (orderManageQueries.status) {
      filters.push({ status: orderManageQueries.status });
    }
    if (orderManageQueries.agencyId) {
      filters.push({ agencyId: Number(orderManageQueries.agencyId) });
    }
    const listData = await this.prisma.agency_Order.findMany({
      skip: skipData,
      take: orderManageQueries.limit,
      include: {
        agency: {
          select: {
            name: true,
          },
        },
      },
      where: filters.length > 0 ? { AND: filters } : {},
      orderBy: {
        id: orderManageQueries.sort === 'newest' ? 'desc' : 'asc',
      },
    });
    const totalOrders = await this.prisma.agency_Order.count({
      where: filters.length > 0 ? { AND: filters } : {},
    });
    return {
      listData,
      paginationInfo: {
        page: orderManageQueries.page,
        limit: orderManageQueries.limit,
        total: totalOrders,
        totalPages: Math.ceil(totalOrders / orderManageQueries.limit),
      },
    };
  }
  async getTotalOrderRestock() {
    return await this.prisma.agency_Order.count();
  }

  async getOrderRestockDetail(orderId: number) {
    const data = await this.prisma.agency_Order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        agency: true,
        orderPayments: true,
        orderItems: true,
      },
    });
    if (!data) throw new NotFoundException('Not found order!');
    return data;
  }

  async getOrderItemDetail(orderItemId: number) {
    const data = await this.prisma.order_Items.findUnique({
      where: {
        id: orderItemId,
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

  // async updateCheckCreditOrder(orderId: number) {
  //   return await this.orderRestockService.updateCheckedOrder(orderId);
  // }

  async updateStatusOrder(orderId: number, updateOrderDto: UpdateOrderStock) {
    const order = await this.orderRestockService.getOrderDetail(orderId);

    //Restrict not allow EVM Staff to change status while order is not official yet.
    if (updateOrderDto.status !== OrderStatus.DRAFT && order.status === 'DRAFT')
      throw new BadRequestException(
        'This order is in draft status, just wait the agreement from agency to update',
      );

    if (
      updateOrderDto.status === OrderStatus.COMPLETED &&
      order.paidAmount < order.total
    )
      throw new BadRequestException(
        'Cannot complete the order until the order is fully paid',
      );

    // Update debt to credit line when order is approved or canceled
    if (updateOrderDto.status === OrderStatus.APPROVED)
      await this.creditLineService.addDebt(order.agencyId, order.total);
    if (updateOrderDto.status === OrderStatus.CANCELED)
      await this.creditLineService.minusDebt(order.agencyId, order.total);
    if (
      updateOrderDto.status === OrderStatus.CANCELED &&
      order.orderPayments.length > 0
    )
      throw new BadRequestException('This order has payment, cannot cancel it');

    const updatedData = await this.prisma.agency_Order.update({
      where: {
        id: orderId,
      },
      data: updateOrderDto,
      include: {
        agency: {
          select: {
            name: true,
          },
        },
      },
    });
    return updatedData;
  }

  async deleteOrder(orderId: number) {
    await this.prisma.$transaction([
      this.prisma.order_Items.deleteMany({
        where: {
          orderId: orderId,
        },
      }),
      this.prisma.order_Payment.deleteMany({
        where: {
          agencyOrderId: orderId,
        },
      }),
      this.prisma.agency_Order.delete({
        where: {
          id: orderId,
        },
      }),
    ]);
    return;
  }

  async updateWarehouseForOrderItem(
    orderItemId: number,
    motorbikeId: number,
    colorId: number,
    warehouseId: number,
  ) {
    const orderItem = await this.prisma.order_Items.findUnique({
      where: {
        id: orderItemId,
      },
    });
    if (!orderItem) throw new NotFoundException('Not found order item!');
    await this.warehouseInventoryService.getInventoryById(
      motorbikeId,
      warehouseId,
      colorId,
    );
    await this.prisma.order_Items.update({
      where: {
        id: orderItemId,
      },
      data: {
        warehouseId: warehouseId,
      },
    });
    await this.warehouseInventoryService.updateInventoryQuantity(
      motorbikeId,
      warehouseId,
      colorId,
      orderItem.quantity,
    );
  }
}
