import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMotorbikeDto } from './dto';
import { Prisma } from 'generated/prisma';
import { MotorbikeRequestQuery } from './types/motorbike.param';

@Injectable()
export class MotorbikeService {
  constructor(private prisma: PrismaService) {}

  async createMotorbike(createMotorbikeDto: CreateMotorbikeDto) {
    const motorbikeData = await this.prisma.electric_Motorbike.create({
      data: createMotorbikeDto,
    });
    return motorbikeData;
  }

  async getAllMotorbike(motorbikeParams: MotorbikeRequestQuery) {
    const skipData = (motorbikeParams.page - 1) * motorbikeParams.limit;
    const filters: any[] = [{ isDeleted: false }];
    if (motorbikeParams.model) {
      filters.push({
        model: { contains: motorbikeParams.model, mode: 'insensitive' },
      });
    }
    if (motorbikeParams.makeFrom) {
      filters.push({
        makeFrom: { contains: motorbikeParams.makeFrom, mode: 'insensitive' },
      });
    }
    const motorbikeList = await this.prisma.electric_Motorbike.findMany({
      skip: skipData,
      take: motorbikeParams.limit,
      where: filters.length > 0 ? { AND: filters } : {},
    });
    return {
      motorbikeList,
      paginationInfo: {
        page: motorbikeParams.page,
        limit: motorbikeParams.limit,
        total: await this.getTotalMotorbikeNotCountDeleted(),
      },
    };
  }

  async getMotorbikeAdmin(motorbikeParams: MotorbikeRequestQuery) {
    const skipData = (motorbikeParams.page - 1) * motorbikeParams.limit;
    const filters: any[] = [];
    if (motorbikeParams.model) {
      filters.push({
        model: { contains: motorbikeParams.model, mode: 'insensitive' },
      });
    }
    if (motorbikeParams.makeFrom) {
      filters.push({
        makeFrom: { contains: motorbikeParams.makeFrom, mode: 'insensitive' },
      });
    }
    const motorbikeList = await this.prisma.electric_Motorbike.findMany({
      skip: skipData,
      take: motorbikeParams.limit,
      where: filters.length > 0 ? { AND: filters } : {},
    });
    return {
      motorbikeList,
      paginationInfo: {
        page: motorbikeParams.page,
        limit: motorbikeParams.limit,
        total: await this.getTotalMotorbikeCountDeleted(),
      },
    };
  }

  async getTotalMotorbikeNotCountDeleted() {
    return await this.prisma.electric_Motorbike.count({
      where: { isDeleted: false },
    });
  }

  async getTotalMotorbikeCountDeleted() {
    return await this.prisma.electric_Motorbike.count();
  }

  async getMotorbikeDetail(motorbikeId: number) {
    const motorbikeData = await this.prisma.electric_Motorbike.findUnique({
      where: {
        id: motorbikeId,
      },
      include: {
        appearance: true,
        battery: true,
        configuration: true,
        safeFeature: true,
      },
    });
    return motorbikeData;
  }

  async updateMotorbike(
    motorbikeId: number,
    updateMotorbikeDto: Prisma.Electric_MotorbikeUpdateInput,
  ) {
    const updateData = await this.prisma.electric_Motorbike.update({
      where: {
        id: motorbikeId,
      },
      data: updateMotorbikeDto,
    });
    return updateData;
  }

  async deleteMotorbike(motorbikeId: number) {
    await this.prisma.electric_Motorbike.update({
      where: {
        id: motorbikeId,
      },
      data: {
        isDeleted: true,
      },
    });
    return;
  }

  async getFilter() {
    const [modelFilter, makeFromFilter] = await this.prisma.$transaction([
      this.prisma.electric_Motorbike.groupBy({
        by: ['model'],
        where: { isDeleted: false },
        orderBy: undefined,
      }),
      this.prisma.electric_Motorbike.groupBy({
        by: ['makeFrom'],
        where: { isDeleted: false },
        orderBy: undefined,
      }),
    ]);

    const responseData = {
      modelFilters: modelFilter.map((item) => {
        return {
          model: item.model,
        };
      }),
      makeFromFilter: makeFromFilter.map((item) => {
        return {
          makeFrom: item.makeFrom,
        };
      }),
    };
    return responseData;
  }
}
