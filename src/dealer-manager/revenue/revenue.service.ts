import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRevenueDto, RevenueQueries } from './dto';

@Injectable()
export class RevenueService {
  constructor(private prisma: PrismaService) {}

  async createRevenue(createRevenueDto: CreateRevenueDto) {
    const currentDate = new Date();
    const isThisMonthRevenueExisted = await this.prisma.$queryRaw`
      select id
      from revenue
      where agencyId = ${createRevenueDto.agencyId}
        and extract(month from "createAt") = ${currentDate.getMonth()}
        and extract(year from "createAt") = ${currentDate.getFullYear()}
    `;

    if (isThisMonthRevenueExisted)
      throw new BadRequestException(
        'This month already generate revenue, please just update or wait to next month to create another one.',
      );
    const createdData = await this.prisma.revenue.create({
      data: {
        ...createRevenueDto,
        createAt: currentDate,
        updateAt: currentDate,
      },
    });
    return createdData;
  }

  // async getListRevenue(agencyId: string, revenueQueries: RevenueQueries) {
  //   const skipData = (revenueQueries.page - 1) * revenueQueries.limit;

  // }
}
