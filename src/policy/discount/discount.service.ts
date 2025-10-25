import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiscountDto, DiscountQueries, UpdateDiscountDto } from './dto';
import { ValueType, DiscountType, DiscountStatus } from './types';

@Injectable()
export class DiscountService {
  constructor(private prisma: PrismaService) {}

  async createDiscount(createDiscountDto: CreateDiscountDto) {
    if (
      createDiscountDto.value_type === ValueType.PERCENT &&
      (createDiscountDto.value < 0 || createDiscountDto.value > 100)
    )
      throw new BadRequestException(
        'Your value type is percent then value must in range 0 - 100',
      );
    if (createDiscountDto.agencyId && createDiscountDto.motorbikeId) {
      const dataExited = await this.prisma.discount_Policy.findUnique({
        where: {
          agencyId_motorbikeId_type: {
            agencyId: createDiscountDto.agencyId,
            motorbikeId: createDiscountDto.motorbikeId,
            type: createDiscountDto.type,
          },
        },
      });
      if (dataExited)
        throw new BadRequestException(
          'This discount with agency, motorbike and type already created',
        );
    }
    const createdData = await this.prisma.discount_Policy.create({
      data: {
        name: createDiscountDto.name,
        type: createDiscountDto.type,
        valueType: createDiscountDto.value_type,
        value: createDiscountDto.value,
        startAt: createDiscountDto.startAt,
        endAt: createDiscountDto.endAt,
        min_quantity: createDiscountDto.min_quantity ?? 0,
        status: createDiscountDto.status,
        motorbikeId: createDiscountDto.motorbikeId,
        agencyId: createDiscountDto.agencyId ?? null,
      },
    });
    return createdData;
  }

  async getListDiscount(discountQuery: DiscountQueries) {
    const skipData = (discountQuery.page - 1) * discountQuery.limit;
    const filters: any[] = [];

    if (discountQuery.motorbikeId) {
      filters.push({ motorbikeId: Number(discountQuery.motorbikeId) });
    }

    if (discountQuery.agencyId) {
      filters.push({ agencyId: Number(discountQuery.agencyId) });
    }
    if (
      discountQuery.type &&
      Object.values(DiscountType).includes(discountQuery.type)
    ) {
      filters.push({
        type: discountQuery.type.toUpperCase(),
      });
    }
    if (
      discountQuery.valueType &&
      Object.values(ValueType).includes(discountQuery.valueType)
    ) {
      filters.push({
        valueType: discountQuery.valueType.toUpperCase(),
      });
    }

    if (
      discountQuery.status &&
      Object.values(DiscountStatus).includes(discountQuery.status)
    ) {
      filters.push({
        status: discountQuery.status.toUpperCase(),
      });
    }

    const listData = await this.prisma.discount_Policy.findMany({
      skip: skipData,
      take: discountQuery.limit,
      where: filters.length > 0 ? { AND: filters } : {},
    });
    return {
      data: listData,
      paginationInfo: {
        page: discountQuery.page,
        limit: discountQuery.limit,
        total: await this.getTotalDiscount(),
      },
    };
  }

  async getTotalDiscount() {
    return await this.prisma.discount_Policy.count();
  }

  async getDiscountDetail(discountId: number) {
    const data = await this.prisma.discount_Policy.findUnique({
      where: {
        id: discountId,
      },
      include: {
        agency: true,
        motorbike: true,
      },
    });
    if (!data) throw new NotFoundException('This discount is not existed!');
    return data;
  }

  async getDiscountPrice(discountId: number) {
    const data = await this.prisma.discount_Policy.findUnique({
      where: {
        id: discountId,
      },
      select: {
        value: true,
        valueType: true,
        status: true,
        endAt: true,
        min_quantity: true,
      },
    });
    if (!data) throw new NotFoundException('This discount is not existed!');
    return data;
  }

  async getAgencyDiscounts(agencyId: number, discountQuery: DiscountQueries) {
    const skipData = (discountQuery.page - 1) * discountQuery.limit;
    const filters: any[] = [];
    if (
      discountQuery.type &&
      Object.values(DiscountType).includes(discountQuery.type)
    ) {
      filters.push({
        type: discountQuery.type.toUpperCase(),
      });
    }
    if (
      discountQuery.valueType &&
      Object.values(ValueType).includes(discountQuery.valueType)
    ) {
      filters.push({
        valueType: discountQuery.valueType.toUpperCase(),
      });
    }
    const listData = await this.prisma.discount_Policy.findMany({
      skip: skipData,
      take: discountQuery.limit,
      where: {
        status: 'ACTIVE',
        agencyId: agencyId,
        ...filters,
      },
    });
    return {
      data: listData,
      paginationInfo: {
        page: discountQuery.page,
        limit: discountQuery.limit,
        total: await this.getTotalAgencyDiscount(agencyId),
      },
    };
  }

  async getTotalAgencyDiscount(agencyId: number) {
    return await this.prisma.discount_Policy.count({
      where: {
        agencyId: agencyId,
        status: 'ACTIVE',
      },
    });
  }

  // async getAgencyDiscountsGlobal(
  //   agencyId: number,
  //   discountQuery: DiscountQueries,
  // ) {
  //   const skipData = (discountQuery.page - 1) * discountQuery.limit;
  //   const listData = await this.prisma.discount_Policy.findMany({
  //     skip: skipData,
  //     take: discountQuery.limit,
  //     where: {
  //       agencyId: agencyId,
  //       motorbikeId: undefined,
  //     },
  //   });
  //   return {
  //     data: listData,
  //     paginationInfo: {
  //       page: discountQuery.page,
  //       limit: discountQuery.limit,
  //       total: await this.getTotalAgencyDiscount(agencyId),
  //     },
  //   };
  // }

  // async getTotalAgencyDiscountGlobal(agencyId: number) {
  //   return await this.prisma.discount_Policy.count({
  //     where: {
  //       agencyId: agencyId,
  //       motorbikeId: undefined,
  //     },
  //   });
  // }

  async getMotorbikeDiscountsGlobal(
    motorbikeId: number,
    discountQuery: DiscountQueries,
  ) {
    const skipData = (discountQuery.page - 1) * discountQuery.limit;
    const filters: any[] = [];
    if (
      discountQuery.type &&
      Object.values(DiscountType).includes(discountQuery.type)
    ) {
      filters.push({
        type: discountQuery.type.toUpperCase(),
      });
    }
    if (
      discountQuery.valueType &&
      Object.values(ValueType).includes(discountQuery.valueType)
    ) {
      filters.push({
        valueType: discountQuery.valueType.toUpperCase(),
      });
    }
    const listData = await this.prisma.discount_Policy.findMany({
      skip: skipData,
      take: discountQuery.limit,
      where: {
        status: 'ACTIVE',
        agencyId: undefined,
        motorbikeId: motorbikeId,
        ...filters,
      },
    });
    return {
      data: listData,
      paginationInfo: {
        page: discountQuery.page,
        limit: discountQuery.limit,
        total: await this.getTotalMotorbikeDiscountGlobal(motorbikeId),
      },
    };
  }

  async getTotalMotorbikeDiscountGlobal(motorbikeId: number) {
    return await this.prisma.discount_Policy.count({
      where: {
        status: 'ACTIVE',
        agencyId: undefined,
        motorbikeId: motorbikeId,
      },
    });
  }

  async updateDiscount(
    discountId: number,
    updateDiscountDto: UpdateDiscountDto,
  ) {
    const updatedData = await this.prisma.discount_Policy.update({
      where: {
        id: discountId,
      },
      data: updateDiscountDto,
    });
    return updatedData;
  }

  async deleteDiscount(discountId: number) {
    await this.prisma.discount_Policy.delete({
      where: {
        id: discountId,
      },
    });
    return;
  }
}
