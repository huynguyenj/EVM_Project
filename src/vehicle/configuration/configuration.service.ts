import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConfigurationDto } from './dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ConfigurationService {
  constructor(private prisma: PrismaService) {}

  async createConfiguration(
    vehicleId: number,
    createConfigurationDto: CreateConfigurationDto,
  ) {
    const configuration = await this.prisma.configuration.create({
      data: {
        ...createConfigurationDto,
        electricMotorbikeId: vehicleId,
      },
    });
    return configuration;
  }

  async getConfigurationByVehicleId(vehicleId: number) {
    return await this.prisma.configuration.findUnique({
      where: { electricMotorbikeId: vehicleId },
    });
  }

  async deleteConfigurationByVehicleId(vehicleId: number) {
    return await this.prisma.configuration.delete({
      where: { electricMotorbikeId: vehicleId },
    });
  }

  async updateConfigurationByVehicleId(
    vehicleId: number,
    updateConfigurationDto: Prisma.ConfigurationUpdateInput,
  ) {
    return await this.prisma.configuration.update({
      where: { electricMotorbikeId: vehicleId },
      data: updateConfigurationDto,
    });
  }
}
