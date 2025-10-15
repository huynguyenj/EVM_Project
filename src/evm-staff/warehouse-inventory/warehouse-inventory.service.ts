import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventoryDto, InventoryQuery, UpdateInventoryDto } from './dto';

@Injectable()
export class WarehouseInventoryService {
  constructor(private prisma: PrismaService) {}

  async createInventory(
    motorbikeId: number,
    warehouseId: number,
    createInventory: CreateInventoryDto,
  ) {
    const isInventoryExisted = await this.prisma.inventory.findUnique({
      where: {
        electricMotorbikeId_warehouseId: {
          electricMotorbikeId: motorbikeId,
          warehouseId: warehouseId,
        },
      },
    });
    if (isInventoryExisted)
      throw new BadRequestException(
        'Inventory with this warehouse and motorbike already created!',
      );
    const createData = await this.prisma.inventory.create({
      data: {
        electricMotorbikeId: motorbikeId,
        warehouseId: warehouseId,
        quantity: createInventory.quantity,
        stockDate: createInventory.stockDate,
        lastUpdate: new Date(),
      },
    });
    return createData;
  }

  async getListInventory(inventoryQuery: InventoryQuery) {
    const skipData = (inventoryQuery.page - 1) * inventoryQuery.limit;
    const dataList = await this.prisma.inventory.findMany({
      skip: skipData,
      take: inventoryQuery.page,
    });
    return {
      data: dataList,
      paginationInfo: {
        page: inventoryQuery.page,
        limit: inventoryQuery.limit,
        total: await this.getTotalInventory(),
      },
    };
  }

  async getTotalInventory() {
    return await this.prisma.inventory.count();
  }

  async getInventoryDetail(motorbikeId: number, warehouseId: number) {
    const data = await this.prisma.inventory.findUnique({
      where: {
        electricMotorbikeId_warehouseId: {
          electricMotorbikeId: motorbikeId,
          warehouseId: warehouseId,
        },
      },
      include: {
        warehouse: true,
        electricMotorbike: true,
      },
    });
    if (!data) throw new NotFoundException('Not found the inventory!');
    return {
      warehouse: data.warehouse,
      motorbike: data.electricMotorbike,
      quantity: data.quantity,
      stockDate: data.stockDate,
      lastUpdate: data.lastUpdate,
    };
  }

  async updateInventory(
    motorbikeId: number,
    warehouseId: number,
    updateInventoryDto: UpdateInventoryDto,
  ) {
    const updatedData = await this.prisma.inventory.update({
      where: {
        electricMotorbikeId_warehouseId: {
          electricMotorbikeId: motorbikeId,
          warehouseId: warehouseId,
        },
      },
      data: {
        lastUpdate: new Date(),
        ...updateInventoryDto,
      },
    });
    return updatedData;
  }

  async deleteInventory(motorbikeId: number, warehouseId: number) {
    await this.prisma.inventory.delete({
      where: {
        electricMotorbikeId_warehouseId: {
          electricMotorbikeId: motorbikeId,
          warehouseId: warehouseId,
        },
      },
    });
    return;
  }
}
