import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderManageQueries, UpdateOrderStock } from './dto';

@Injectable()
export class OrderRestockManagementService {
  constructor(private prisma: PrismaService) {}

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

  async updateStatusOrder(orderId: number, updateOrderDto: UpdateOrderStock) {
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
