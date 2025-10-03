import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { CreateAppearanceDto } from './dto';

@Injectable()
export class AppearanceService {
  constructor(private prisma: PrismaService) {}

  async createAppearance(
    vehicleId: number,
    createAppearanceDto: CreateAppearanceDto,
  ) {
    const isDataExist = await this.prisma.appearance.findUnique({
      where: { electricMotorbikeId: vehicleId },
    });
    if (isDataExist) return;
    const appearanceData = await this.prisma.appearance.create({
      data: {
        ...createAppearanceDto,
        electricMotorbikeId: vehicleId,
      },
    });
    return appearanceData;
  }

  async getAppearanceByVehicleId(vehicleId: number) {
    return await this.prisma.appearance.findUnique({
      where: { electricMotorbikeId: vehicleId },
    });
  }

  async deleteAppearanceByVehicleId(vehicleId: number) {
    return await this.prisma.appearance.delete({
      where: { electricMotorbikeId: vehicleId },
    });
  }

  async updateAppearanceByVehicleId(
    vehicleId: number,
    updateAppearanceDto: Prisma.AppearanceUpdateInput,
  ) {
    return await this.prisma.appearance.update({
      where: { electricMotorbikeId: vehicleId },
      data: updateAppearanceDto,
    });
  }
}
