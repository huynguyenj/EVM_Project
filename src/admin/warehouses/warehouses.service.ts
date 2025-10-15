import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWarehouseDto, UpdateWarehouseDto } from './dto';
import { WarehouseQueries } from './dto/request/query-warehouse';

@Injectable()
export class WarehousesService {
  constructor(private prisma: PrismaService) {}

  async createWarehouse(createWarehouseDto: CreateWarehouseDto) {
    const createdData = await this.prisma.warehouse.create({
      data: createWarehouseDto,
    });
    return createdData;
  }

  async getWarehouseList(warehouseQueries: WarehouseQueries) {
    const skipData = (warehouseQueries.page - 1) * warehouseQueries.limit;
    const filters: any[] = [];
    if (warehouseQueries.location) {
      filters.push({
        location: {
          contains: warehouseQueries.location,
          mode: 'insensitive',
        },
      });
    }
    if (warehouseQueries.address) {
      filters.push({
        address: {
          contains: warehouseQueries.address,
          mode: 'insensitive',
        },
      });
    }
    const dataList = await this.prisma.warehouse.findMany({
      skip: skipData,
      take: warehouseQueries.limit,
      where: filters.length > 0 ? { AND: filters } : {},
    });
    return {
      dataList,
      paginationInfo: {
        page: warehouseQueries.page,
        limit: warehouseQueries.limit,
        total: await this.getTotalWarehouse(),
      },
    };
  }

  async getTotalWarehouse() {
    return await this.prisma.warehouse.count();
  }

  async getWarehouseDetail(warehouseId: number) {
    const data = await this.prisma.warehouse.findUnique({
      where: {
        id: warehouseId,
      },
    });
    if (!data) throw new NotFoundException('Not found the warehouse!');
    return data;
  }

  async updateWarehouse(
    warehouseId: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ) {
    const data = await this.prisma.warehouse.update({
      where: {
        id: warehouseId,
      },
      data: updateWarehouseDto,
    });
    if (!data) throw new NotFoundException('Not found the warehouse!');
    return data;
  }

  async deleteWarehouse(warehouseId: number) {
    await this.prisma.warehouse.delete({
      where: {
        id: warehouseId,
      },
    });
    return;
  }
}
