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
    colorId: number,
    createInventory: CreateInventoryDto,
  ) {
    const isInventoryExisted = await this.prisma.inventory.findUnique({
      where: {
        electricMotorbikeId_warehouseId_colorId: {
          electricMotorbikeId: motorbikeId,
          warehouseId: warehouseId,
          colorId: colorId,
        },
      },
    });
    if (isInventoryExisted)
      throw new BadRequestException(
        'Inventory with this warehouse and motorbike with the color already created!',
      );
    const createData = await this.prisma.inventory.create({
      data: {
        electricMotorbikeId: motorbikeId,
        warehouseId: warehouseId,
        colorId: colorId,
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
      take: inventoryQuery.limit,
    });
    const totalInventory = await this.getTotalInventory();
    return {
      data: dataList,
      paginationInfo: {
        page: inventoryQuery.page,
        limit: inventoryQuery.limit,
        total: totalInventory,
        totalPages: Math.ceil(totalInventory / inventoryQuery.limit),
      },
    };
  }

  async getTotalInventory() {
    return await this.prisma.inventory.count();
  }

  async getInventoryDetail(
    motorbikeId: number,
    warehouseId: number,
    colorId: number,
  ) {
    const data = await this.prisma.inventory.findUnique({
      where: {
        electricMotorbikeId_warehouseId_colorId: {
          electricMotorbikeId: motorbikeId,
          warehouseId: warehouseId,
          colorId: colorId,
        },
      },
      include: {
        warehouse: true,
        electricMotorbike: true,
        color: true,
      },
    });
    if (!data) throw new NotFoundException('Not found the inventory!');
    return {
      warehouse: data.warehouse,
      motorbike: data.electricMotorbike,
      color: data.color.colorType,
      quantity: data.quantity,
      stockDate: data.stockDate,
      lastUpdate: data.lastUpdate,
    };
  }

  async getInventoryById(
    motorbikeId: number,
    warehouseId: number,
    colorId: number,
  ) {
    const data = await this.prisma.inventory.findUnique({
      where: {
        electricMotorbikeId_warehouseId_colorId: {
          electricMotorbikeId: motorbikeId,
          warehouseId: warehouseId,
          colorId: colorId,
        },
      },
    });
    if (!data) throw new NotFoundException('Not found the inventory!');
    return data;
  }

  async updateInventory(
    motorbikeId: number,
    warehouseId: number,
    colorId: number,
    updateInventoryDto: UpdateInventoryDto,
  ) {
    const updatedData = await this.prisma.inventory.update({
      where: {
        electricMotorbikeId_warehouseId_colorId: {
          electricMotorbikeId: motorbikeId,
          warehouseId: warehouseId,
          colorId: colorId,
        },
      },
      data: {
        lastUpdate: new Date(),
        ...updateInventoryDto,
      },
    });
    return updatedData;
  }

  async updateInventoryQuantity(
    motorbikeId: number,
    warehouseId: number,
    colorId: number,
    requiredQuantity: number,
  ) {
    const inventoryData = await this.getInventoryById(
      motorbikeId,
      warehouseId,
      colorId,
    );
    await this.prisma.inventory.update({
      where: {
        electricMotorbikeId_warehouseId_colorId: {
          electricMotorbikeId: motorbikeId,
          warehouseId: warehouseId,
          colorId: colorId,
        },
      },
      data: {
        quantity: inventoryData.quantity - requiredQuantity,
      },
    });
  }

  async deleteInventory(
    motorbikeId: number,
    warehouseId: number,
    colorId: number,
  ) {
    await this.prisma.inventory.delete({
      where: {
        electricMotorbikeId_warehouseId_colorId: {
          electricMotorbikeId: motorbikeId,
          warehouseId: warehouseId,
          colorId: colorId,
        },
      },
    });
    return;
  }

  async getListWarehouseByMotorbikeId(motorbikeId: number) {
    const listData = await this.prisma.inventory.findMany({
      where: {
        electricMotorbikeId: motorbikeId,
      },
    });
    return listData;
  }

  async checkInventory(
    motorbikeId: number,
    warehouseId: number,
    colorId: number,
    requestQuantity: number,
  ) {
    const inventory = await this.prisma.inventory.findUnique({
      where: {
        electricMotorbikeId_warehouseId_colorId: {
          electricMotorbikeId: motorbikeId,
          warehouseId: warehouseId,
          colorId: colorId,
        },
      },
    });
    if (!inventory)
      throw new BadRequestException('Not find inventory of the warehouse');
    if (requestQuantity > inventory.quantity)
      throw new BadRequestException(
        `Your request quantity ${requestQuantity} is over the warehouse quantity ${inventory.quantity}`,
      );
  }
}
