import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePromotionDto,
  PromotionQueries,
  UpdatePromotionDto,
} from './dto';
import { PromotionValueType } from './types';

@Injectable()
export class PromotionService {
  constructor(private prisma: PrismaService) {}

  async createPromotion(createPromotionDto: CreatePromotionDto) {
    if (
      createPromotionDto.value_type === PromotionValueType.PERCENT &&
      (createPromotionDto.value < 0 || createPromotionDto.value > 100)
    )
      throw new BadRequestException(
        'Your value .valueType is percent then value must in range 0 - 100',
      );
    const createdData = await this.prisma.promotion.create({
      data: {
        name: createPromotionDto.name,
        description: createPromotionDto.description,
        valueType: createPromotionDto.value_type,
        value: createPromotionDto.value,
        startAt: createPromotionDto.startAt,
        endAt: createPromotionDto.endAt,
        status: createPromotionDto.status,
        motorbikeId: createPromotionDto.motorbikeId ?? null,
        agencyId: createPromotionDto.agencyId ?? null,
      },
    });
    return createdData;
  }

  async getListPromotion(promotionQueries: PromotionQueries) {
    const skipData = (promotionQueries.page - 1) * promotionQueries.limit;
    const filters: any[] = [];
    if (
      promotionQueries.valueType &&
      Object.values(PromotionValueType).includes(promotionQueries.valueType)
    ) {
      filters.push({
        valueType: promotionQueries.valueType.toUpperCase(),
      });
    }
    const listData = await this.prisma.promotion.findMany({
      skip: skipData,
      take: promotionQueries.limit,
      where: filters.length > 0 ? { AND: filters } : {},
    });
    console.log(filters);
    return {
      data: listData,
      paginationInfo: {
        page: promotionQueries.page,
        limit: promotionQueries.limit,
        total: await this.getTotalPromotion(),
      },
    };
  }

  async getTotalPromotion() {
    return await this.prisma.promotion.count();
  }

  async getPromotionDetail(PromotionId: number) {
    const data = await this.prisma.promotion.findUnique({
      where: {
        id: PromotionId,
      },
      include: {
        agency: true,
        motorbike: true,
      },
    });
    if (!data) throw new NotFoundException('This Promotion is not existed!');
    return data;
  }

  async getPromotionPrice(promotionId: number) {
    const data = await this.prisma.promotion.findUnique({
      where: {
        id: promotionId,
      },
      select: {
        value: true,
        valueType: true,
      },
    });
    if (!data) throw new NotFoundException('This promotion is not existed!');
    return data;
  }

  async getAgencyPromotions(
    agencyId: number,
    promotionQueries: PromotionQueries,
  ) {
    const skipData = (promotionQueries.page - 1) * promotionQueries.limit;
    const filters: any[] = [];
    if (
      promotionQueries.valueType &&
      Object.values(PromotionValueType).includes(promotionQueries.valueType)
    ) {
      filters.push({
        valueType: promotionQueries.valueType.toUpperCase(),
      });
    }
    const listData = await this.prisma.promotion.findMany({
      skip: skipData,
      take: promotionQueries.limit,
      where: {
        agencyId: agencyId,
      },
    });
    return {
      data: listData,
      paginationInfo: {
        page: promotionQueries.page,
        limit: promotionQueries.limit,
        total: await this.getTotalAgencyPromotion(agencyId),
      },
    };
  }

  async getTotalAgencyPromotion(agencyId: number) {
    return await this.prisma.promotion.count({
      where: {
        agencyId: agencyId,
      },
    });
  }

  async updatePromotion(
    PromotionId: number,
    updatePromotionDto: UpdatePromotionDto,
  ) {
    const updatedData = await this.prisma.promotion.update({
      where: {
        id: PromotionId,
      },
      data: updatePromotionDto,
    });
    return updatedData;
  }

  async deletePromotion(PromotionId: number) {
    await this.prisma.promotion.delete({
      where: {
        id: PromotionId,
      },
    });
    return;
  }
}
