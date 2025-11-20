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

@Injectable()
export class OrderRestockManagementService {
  constructor(
    private orderRestockService: OrderRestockService,
    private warehouseInventoryService: WarehouseInventoryService,
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

  async updateCheckCreditOrder(orderId: number) {
    return await this.orderRestockService.updateCheckedOrder(orderId);
  }

  async updateStatusOrder(orderId: number, updateOrderDto: UpdateOrderStock) {
    const order = await this.orderRestockService.getOrderDetail(orderId);

    //Restrict not allow EVM Staff to change status while order is not official yet.
    if (updateOrderDto.status !== OrderStatus.DRAFT && order.status === 'DRAFT')
      throw new BadRequestException(
        'This order is in draft status, just wait the agreement from agency to update',
      );

    //Make sure EVM Staff is check credit before change status
    if (updateOrderDto.status !== OrderStatus.PENDING && !order.creditChecked)
      throw new BadRequestException(
        'Please check credit of this order, make sure it is allowed.',
      );

    //Update inventory if EVM Staff approve the order
    if (order.status === 'APPROVED') {
      for (const orderItem of order.orderItems) {
        await this.warehouseInventoryService.updateInventoryQuantity(
          orderItem.electricMotorbikeId,
          orderItem.warehouseId,
          orderItem.colorId,
          orderItem.quantity,
        );
      }
    }

    const updatedData = await this.prisma.agency_Order.update({
      where: {
        id: orderId,
      },
      data: updateOrderDto,
    });
    return updatedData;
  }

  async deleteOrder(orderId: number) {
    await this.prisma.order_Items.deleteMany({
      where: {
        orderId: orderId,
      },
    });
    await this.prisma.agency_Order.delete({
      where: {
        id: orderId,
      },
    });
    return;
  }
}
