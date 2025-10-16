import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePriceDto, PriceQueries, UpdatePriceDto } from './dto';

@Injectable()
export class PriceService {
  constructor(private prisma: PrismaService) {}

  async createPrice(createPriceDto: CreatePriceDto) {
    const isPricePolicyExisted = await this.prisma.price_Policy.findUnique({
      where: {
        agencyId_motorbikeId: {
          agencyId: createPriceDto.agencyId,
          motorbikeId: createPriceDto.motorbikeId,
        },
      },
    });
    if (isPricePolicyExisted)
      throw new BadRequestException(
        'This agency and motorbike already have price policy!',
      );
    const createdData = await this.prisma.price_Policy.create({
      data: {
        title: createPriceDto.title,
        content: createPriceDto.content,
        policy: createPriceDto.policy,
        wholesalePrice: createPriceDto.wholesalePrice,
        agencyId: createPriceDto.agencyId ?? null,
        motorbikeId: createPriceDto.motorbikeId,
      },
    });
    return createdData;
  }

  async getListPricePolicies(priceQuery: PriceQueries) {
    const skipData = (priceQuery.page - 1) * priceQuery.limit;
    const listData = await this.prisma.discount_Policy.findMany({
      skip: skipData,
      take: priceQuery.limit,
    });
    return {
      data: listData,
      paginationInfo: {
        page: priceQuery.page,
        limit: priceQuery.limit,
        total: await this.getTotalPricePolicy(),
      },
    };
  }

  async getPricePolicyAgencyAndMotorbike(
    agencyId: number,
    motorbikeId: number,
  ) {
    const data = await this.prisma.price_Policy.findUnique({
      where: {
        agencyId_motorbikeId: {
          agencyId: agencyId,
          motorbikeId: motorbikeId,
        },
      },
    });
    if (!data) throw new NotFoundException('Not found price policy!');
    return data;
  }

  async getTotalPricePolicy() {
    return await this.prisma.price_Policy.count();
  }

  async getPricePolicyDetail(pricePolicyId: number) {
    const data = await this.prisma.price_Policy.findUnique({
      where: {
        id: pricePolicyId,
      },
    });
    if (!data) throw new NotFoundException('Not found price policy!');
    return data;
  }

  async getAgencyPricePolicies(agencyId: number) {
    const data = await this.prisma.price_Policy.findMany({
      where: {
        agencyId: agencyId,
      },
    });
    return data;
  }

  async getMotorbikePricePolicies(motorbikeId: number) {
    const data = await this.prisma.price_Policy.findMany({
      where: {
        motorbikeId: motorbikeId,
      },
    });
    return data;
  }

  async updatePricePolicy(
    pricePolicyId: number,
    updatePricePolicyDto: UpdatePriceDto,
  ) {
    const updatedData = await this.prisma.price_Policy.update({
      where: {
        id: pricePolicyId,
      },
      data: updatePricePolicyDto,
    });
    return updatedData;
  }

  async deletePricePolicy(pricePolicyId: number) {
    await this.prisma.price_Policy.delete({
      where: {
        id: pricePolicyId,
      },
    });
    return;
  }
}
