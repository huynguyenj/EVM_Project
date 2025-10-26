import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateStockPromotionDto,
  StockPromotionQueries,
  UpdateStockPromotionDto,
} from './dto';
import { StockPromotionStatus, StockPromotionValueType } from './types';
import { AssignStockPromotionDto } from './dto/request/assign-stock-promotion-dto';

@Injectable()
export class StockPromotionService {
  constructor(private prisma: PrismaService) {}

  async createStockPromotion(createStockPromotionDto: CreateStockPromotionDto) {
    if (
      createStockPromotionDto.valueType === StockPromotionValueType.PERCENT &&
      (createStockPromotionDto.value < 0 || createStockPromotionDto.value > 100)
    )
      throw new BadRequestException(
        'Your value .valueType is percent then value must in range 0 - 100',
      );
    const createdData = await this.prisma.stock_Promotion.create({
      data: createStockPromotionDto,
    });
    return createdData;
  }

  async assignPromotionToStock(assignStockPromotion: AssignStockPromotionDto) {
    await this.prisma.$transaction(
      assignStockPromotion.listStockId.map((stockId) =>
        this.prisma.agency_Stock_Promotion.create({
          data: {
            agencyStockId: stockId,
            stockPromotionId: assignStockPromotion.stockPromotionId,
          },
        }),
      ),
    );
    return;
  }

  async getListStockPromotion(
    agencyId: number,
    stockPromotionQueries: StockPromotionQueries,
  ) {
    const skipData =
      (stockPromotionQueries.page - 1) * stockPromotionQueries.limit;
    const filters: any[] = [];
    if (
      stockPromotionQueries.valueType &&
      Object.values(StockPromotionValueType).includes(
        stockPromotionQueries.valueType,
      )
    ) {
      filters.push({
        valueType: stockPromotionQueries.valueType.toUpperCase(),
      });
    }

    if (
      stockPromotionQueries.status &&
      Object.values(StockPromotionStatus).includes(stockPromotionQueries.status)
    ) {
      filters.push({ status: stockPromotionQueries.status });
    }

    const listData = await this.prisma.stock_Promotion.findMany({
      skip: skipData,
      take: stockPromotionQueries.limit,
      where: filters.length > 0 ? { AND: filters } : {},
    });
    return {
      data: listData,
      paginationInfo: {
        page: stockPromotionQueries.page,
        limit: stockPromotionQueries.limit,
        total: await this.getTotalStockPromotion(agencyId),
      },
    };
  }

  async getTotalStockPromotion(agencyId: number) {
    return await this.prisma.stock_Promotion.count({
      where: {
        agencyId: agencyId,
      },
    });
  }

  async getStockPromotionDetail(stockPromotionId: number) {
    const data = await this.prisma.stock_Promotion.findUnique({
      where: {
        id: stockPromotionId,
      },
      include: {
        agencyStockPromotion: {
          select: {
            agencyStock: {
              select: {
                id: true,
                quantity: true,
                price: true,
                color: {
                  select: {
                    colorType: true,
                  },
                },
                motorbike: {
                  select: {
                    name: true,
                    version: true,
                    makeFrom: true,
                    model: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!data) throw new NotFoundException('This Promotion is not existed!');
    return data;
  }

  async updateStockPromotion(
    stockPromotionId: number,
    updateStockPromotionDto: UpdateStockPromotionDto,
  ) {
    const updatedData = await this.prisma.stock_Promotion.update({
      where: {
        id: stockPromotionId,
      },
      data: updateStockPromotionDto,
    });
    return updatedData;
  }

  async deleteStockPromotion(stockPromotionId: number) {
    await this.prisma.agency_Stock_Promotion.deleteMany({
      where: {
        stockPromotionId: stockPromotionId,
      },
    });
    await this.prisma.stock_Promotion.delete({
      where: {
        id: stockPromotionId,
      },
    });
    return;
  }
}
