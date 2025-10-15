import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSafeFeatureDto } from './dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class SafeFeatureService {
  constructor(private prisma: PrismaService) {}

  async createSafeFeature(
    vehicleId: number,
    createSafeFeatureDto: CreateSafeFeatureDto,
  ) {
    const isDataExisted = await this.prisma.safe_Feature.findUnique({
      where: {
        electricMotorbikeId: vehicleId,
      },
    });
    if (isDataExisted)
      throw new BadRequestException('This vehicle already have safe feature!');
    const safeFeature = await this.prisma.safe_Feature.create({
      data: {
        ...createSafeFeatureDto,
        electricMotorbikeId: vehicleId,
      },
    });
    return safeFeature;
  }

  async getSafeFeaturesByVehicleId(vehicleId: number) {
    const safeFeatures = await this.prisma.safe_Feature.findUnique({
      where: { electricMotorbikeId: vehicleId },
    });
    if (!safeFeatures)
      throw new NotFoundException(
        'Not found safe feature with this motorbike!',
      );
    return safeFeatures;
  }

  async deleteSafeFeaturesByVehicleId(vehicleId: number) {
    return await this.prisma.safe_Feature.delete({
      where: { electricMotorbikeId: vehicleId },
    });
  }

  async updateSafeFeaturesByVehicleId(
    vehicleId: number,
    updateSafeFeatureDto: Prisma.Safe_FeatureUpdateInput,
  ) {
    return await this.prisma.safe_Feature.update({
      where: { electricMotorbikeId: vehicleId },
      data: updateSafeFeatureDto,
    });
  }
}
