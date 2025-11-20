import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateInstallmentPlanDto,
  InstallmentPlanQueries,
  UpdateInstallmentPlanDto,
} from './dto';

@Injectable()
export class InstallmentPlanService {
  constructor(private prisma: PrismaService) {}

  async createInstallmentPlan(createInstallmentPlan: CreateInstallmentPlanDto) {
    const createdData = await this.prisma.installment_Plan.create({
      data: createInstallmentPlan,
    });
    return createdData;
  }

  async getListInstallmentPlan(
    agencyId: number,
    installmentPlanQueries: InstallmentPlanQueries,
  ) {
    const skipData =
      (installmentPlanQueries.page - 1) * installmentPlanQueries.limit;
    const filters: object[] = [];
    if (installmentPlanQueries.interestPaidType) {
      filters.push({
        interestPaidType: installmentPlanQueries.interestPaidType,
      });
    }
    if (installmentPlanQueries.status) {
      filters.push({ status: installmentPlanQueries.status });
    }

    const listData = await this.prisma.installment_Plan.findMany({
      skip: skipData,
      take: installmentPlanQueries.limit,
      where: {
        AND: [{ agencyId: agencyId }, ...filters],
      },
      orderBy: {
        id: installmentPlanQueries.sort === 'newest' ? 'desc' : 'asc',
      },
    });
    const totalInstallmentPlans = await this.prisma.installment_Plan.count({
      where: {
        AND: [{ agencyId: agencyId }, ...filters],
      },
    });
    return {
      data: listData,
      paginationInfo: {
        page: installmentPlanQueries.page,
        limit: installmentPlanQueries.limit,
        total: totalInstallmentPlans,
        totalPages: Math.ceil(
          totalInstallmentPlans / installmentPlanQueries.limit,
        ),
      },
    };
  }

  async getTotalAgencyInstallmentPlan(agencyId: number) {
    return await this.prisma.installment_Plan.count({
      where: {
        agencyId: agencyId,
      },
    });
  }

  async getInstallmentPlanDetail(installmentPlanId: number) {
    const data = await this.prisma.installment_Plan.findUnique({
      where: {
        id: installmentPlanId,
      },
    });
    if (!data) throw new NotFoundException('Not found installment plan');
    return data;
  }

  async updateInstallmentPlan(
    installmentPlanId: number,
    updateInstallmentPlanDto: UpdateInstallmentPlanDto,
  ) {
    const updatedData = await this.prisma.installment_Plan.update({
      where: {
        id: installmentPlanId,
      },
      data: updateInstallmentPlanDto,
    });
    return updatedData;
  }

  async deleteInstallmentPlan(installmentPlanId: number) {
    await this.prisma.installment_Plan.delete({
      where: {
        id: installmentPlanId,
      },
    });
    return;
  }
}
