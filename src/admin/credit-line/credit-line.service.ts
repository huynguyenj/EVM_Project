import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCreditLineDto,
  CreditLineQueries,
  UpdateCreditLineDto,
} from './dto';

@Injectable()
export class CreditLineService {
  constructor(private prisma: PrismaService) {}

  async createCreditLine(createCreditLineDto: CreateCreditLineDto) {
    const agency = await this.prisma.agency.findUnique({
      where: { id: createCreditLineDto.agencyId },
    });

    if (!agency) {
      throw new NotFoundException(
        `Agency with ID ${createCreditLineDto.agencyId} not found`,
      );
    }

    const existingCreditLine = await this.prisma.credit_Line.findUnique({
      where: { agencyId: createCreditLineDto.agencyId },
    });

    if (existingCreditLine) {
      throw new BadRequestException(
        `Credit line already exists for agency ID ${createCreditLineDto.agencyId}`,
      );
    }

    return await this.prisma.credit_Line.create({
      data: createCreditLineDto,
    });
  }

  async getAllCreditLine(creditLineQuery: CreditLineQueries) {
    const skip = (creditLineQuery.page - 1) * creditLineQuery.limit;
    const filters: object[] = [];
    if (creditLineQuery.agencyId) {
      filters.push({ agencyId: Number(creditLineQuery.agencyId) });
    }
    const data = await this.prisma.credit_Line.findMany({
      skip,
      take: creditLineQuery.limit,
      where: filters.length > 0 ? { AND: filters } : {},
    });

    return {
      data,
      paginationInfo: {
        page: creditLineQuery.page,
        limit: creditLineQuery.limit,
        total: await this.getTotalCreditLine(),
      },
    };
  }

  private async getTotalCreditLine() {
    return await this.prisma.credit_Line.count();
  }

  async getCreditLineDetail(creditLineId: number) {
    const creditLine = await this.prisma.credit_Line.findUnique({
      where: { id: creditLineId },
      include: {
        agency: true,
      },
    });

    if (!creditLine) {
      throw new NotFoundException(
        `Credit line with ID ${creditLineId} not found`,
      );
    }

    return creditLine;
  }

  async getCreditLineByAgencyId(agencyId: number) {
    const creditLine = await this.prisma.credit_Line.findUnique({
      where: { agencyId },
    });

    if (!creditLine) {
      throw new NotFoundException(
        `Credit line for agency ID ${agencyId} not found`,
      );
    }

    return creditLine;
  }

  async updateCreditLine(
    creditLineId: number,
    updateCreditLineDto: UpdateCreditLineDto,
  ) {
    const updated = this.prisma.credit_Line.update({
      where: { id: creditLineId },
      data: updateCreditLineDto,
    });
    return updated;
  }

  async deleteCreditLine(creditLineId: number) {
    await this.prisma.credit_Line.delete({
      where: { id: creditLineId },
    });
    return;
  }

  //Block
  async block(creditLineId: number) {
    await this.prisma.credit_Line.update({
      where: { id: creditLineId },
      data: { isBlocked: true },
    });
    return;
  }

  // Unblock a credit line
  async unblock(creditLineId: number) {
    await this.prisma.credit_Line.update({
      where: { id: creditLineId },
      data: { isBlocked: false },
    });
    return;
  }

  // Check credit
  async checkOverCreditLimit(agencyId: number) {
    const creditLine = await this.prisma.credit_Line.findUnique({
      where: { agencyId: agencyId },
    });
    if (!creditLine) throw new BadRequestException('Not found credit line');
    if (creditLine.creditLimit <= 0)
      throw new BadRequestException('Your credit limit is not enough to order');
  }

  async checkWarningThreshold(agencyId: number, currentUsage: number) {
    const creditLine = await this.prisma.credit_Line.findUnique({
      where: { agencyId: agencyId },
    });

    if (!creditLine)
      throw new NotFoundException('Can not found credit of this agency');

    const usagePercentage = (currentUsage / creditLine.creditLimit) * 100;

    return {
      isWarning: usagePercentage >= creditLine.warningThreshold,
      usagePercentage,
      creditLimit: creditLine.creditLimit,
      currentUsage,
      warningThreshold: creditLine.warningThreshold,
    };
  }
}
