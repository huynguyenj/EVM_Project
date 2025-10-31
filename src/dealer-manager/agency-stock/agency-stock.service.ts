import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AgencyStockQueries,
  CreateAgencyStockDto,
  UpdateAgencyStockDto,
} from './dto';
import { MotorbikeService } from 'src/vehicle/electric-motorbike/motorbike.service';

@Injectable()
export class AgencyStockService {
  constructor(
    private prisma: PrismaService,
    private motorbikeService: MotorbikeService,
  ) {}

  async createAgencyStock(createAgencyStockDto: CreateAgencyStockDto) {
    const motorbikeColor = await this.motorbikeService.getMotorbikeColor(
      createAgencyStockDto.motorbikeId,
      createAgencyStockDto.colorId,
    );
    const isMotorbikeStockExited = await this.prisma.agency_Stock.findUnique({
      where: {
        motorbikeId_colorId: {
          colorId: motorbikeColor.colorId,
          motorbikeId: createAgencyStockDto.motorbikeId,
        },
      },
    });
    if (isMotorbikeStockExited)
      throw new BadRequestException(
        'This motorbike with this color already available in stock.',
      );
    const createdData = await this.prisma.agency_Stock.create({
      data: createAgencyStockDto,
    });
    return createdData;
  }

  async getListAgencyStock(
    agencyId: number,
    agencyStockQueries: AgencyStockQueries,
  ) {
    const skipData = (agencyStockQueries.page - 1) * agencyStockQueries.limit;
    const filters: any[] = [{ agencyId: agencyId }];
    if (agencyStockQueries.motorbikeId) {
      filters.push({ motorbikeId: Number(agencyStockQueries.motorbikeId) });
    }
    if (agencyStockQueries.colorId) {
      filters.push({ colorId: Number(agencyStockQueries.colorId) });
    }
    const listData = await this.prisma.agency_Stock.findMany({
      skip: skipData,
      take: agencyStockQueries.limit,
      where: {
        AND: filters,
      },
    });
    return {
      data: listData,
      paginationInfo: {
        page: agencyStockQueries.page,
        limit: agencyStockQueries.limit,
        total: await this.getTotalAgencyStock(agencyId),
      },
    };
  }

  async getTotalAgencyStock(agencyId: number) {
    return await this.prisma.agency_Stock.count({
      where: {
        agencyId: agencyId,
      },
    });
  }

  async getAgencyStockDetail(agencyStockId: number) {
    const data = await this.prisma.agency_Stock.findUnique({
      where: {
        id: agencyStockId,
      },
      include: {
        agencyStockPromotion: {
          include: {
            stockPromotion: true,
          },
        },
        color: true,
        motorbike: {
          select: {
            id: true,
            name: true,
            price: true,
            version: true,
            model: true,
            makeFrom: true,
            images: {
              select: {
                id: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });
    if (!data) throw new NotFoundException('Not found this stock!');
    return data;
  }

  async updateAgencyStock(
    agencyStockId: number,
    updateAgencyStockDto: UpdateAgencyStockDto,
  ) {
    const updatedData = await this.prisma.agency_Stock.update({
      where: {
        id: agencyStockId,
      },
      data: {
        ...updateAgencyStockDto,
        updateAt: new Date(),
      },
    });
    return updatedData;
  }

  async deleteAgencyStock(agencyStockId: number) {
    await this.prisma.agency_Stock_Promotion.deleteMany({
      where: {
        agencyStockId: agencyStockId,
      },
    });
    await this.prisma.agency_Stock.delete({
      where: {
        id: agencyStockId,
      },
    });
    return;
  }
}
