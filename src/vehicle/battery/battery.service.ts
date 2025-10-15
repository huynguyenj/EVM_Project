import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { CreateBatteryDto } from './dto';

@Injectable()
export class BatteryService {
  constructor(private prisma: PrismaService) {}

  async createBattery(vehicleId: number, createBatteryDto: CreateBatteryDto) {
    const isBatteryExisted = await this.prisma.battery.findUnique({
      where: {
        electricMotorbikeId: vehicleId,
      },
    });
    if (isBatteryExisted)
      throw new BadRequestException('This battery already existed!');
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
    if (!battery)
      throw new NotFoundException('Can not found battery of this motorbike!');
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
