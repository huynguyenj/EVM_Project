import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderManageQueries, UpdateOrderStock } from './dto';
import { OrderRestockService } from 'src/dealer-manager/order-restock/order-restock.service';
import { OrderStatus } from 'src/dealer-manager/order-restock/types';

@Injectable()
export class OrderRestockManagementService {
  constructor(
    private orderRestockService: OrderRestockService,
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
    });
    return {
      listData,
      paginationInfo: {
        page: orderManageQueries.page,
        limit: orderManageQueries.limit,
        total: await this.getTotalOrderRestock(),
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

  async updateStatusOrder(orderId: number, updateOrderDto: UpdateOrderStock) {
    const order = await this.orderRestockService.getOrderDetail(orderId);
    if (
      (updateOrderDto.status === OrderStatus.DELIVERED ||
        updateOrderDto.status === OrderStatus.APPROVED) &&
      !order.creditChecked
    )
      throw new BadRequestException(
        'Please check credit of this order, make sure it is allowed.',
      );
    const updatedData = await this.prisma.agency_Order.update({
      where: {
        id: orderId,
      },
      data: updateOrderDto,
    });
    return updatedData;
  }

  async deleteOrder(orderId: number) {
    await this.prisma.agency_Order.delete({
      where: {
        id: orderId,
      },
    });
    return;
  }
}
