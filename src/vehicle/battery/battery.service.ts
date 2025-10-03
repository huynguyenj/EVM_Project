import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { CreateBatteryDto } from './dto';

@Injectable()
export class BatteryService {
  constructor(private prisma: PrismaService) {}

  async createBattery(vehicleId: number, createBatteryDto: CreateBatteryDto) {
    const createdBattery = await this.prisma.battery.create({
      data: {
        ...createBatteryDto,
        electricMotorbikeId: vehicleId,
      },
    });
    return createdBattery;
  }

  async getBatteryByVehicleId(vehicleId: number) {
    const battery = await this.prisma.battery.findUnique({
      where: { electricMotorbikeId: vehicleId },
    });
    return battery;
  }

  async deleteBatteryByVehicleId(vehicleId: number) {
    await this.prisma.battery.delete({
      where: { electricMotorbikeId: vehicleId },
    });
    return;
  }

  async updateBatteryByVehicleId(
    vehicleId: number,
    updateBatteryDto: Prisma.BatteryUpdateInput,
  ) {
    const updatedBattery = await this.prisma.battery.update({
      where: { electricMotorbikeId: vehicleId },
      data: updateBatteryDto,
    });
    return updatedBattery;
  }
}
