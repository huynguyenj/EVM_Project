import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BatchesQueries, CreateBatchesDto, UpdateBatchesDto } from './dto';
import { BatchesStatus } from './types';
import { CreditLineService } from 'src/admin/credit-line/credit-line.service';

@Injectable()
export class BatchesManagementService {
  constructor(
    private prisma: PrismaService,
    private creditLineService: CreditLineService,
  ) {}

  async createApBatches(createApBatches: CreateBatchesDto) {
    const createdData = await this.prisma.ap_Batches.create({
      data: createApBatches,
    });
    return createdData;
  }

  async getAllBatches(batchesQueries: BatchesQueries) {
    const skipData = (batchesQueries.page - 1) * batchesQueries.limit;
    const filters: any[] = [];
    if (
      batchesQueries.status &&
      Object.values(BatchesStatus).includes(batchesQueries.status)
    ) {
      filters.push({
        status: batchesQueries.status.toUpperCase(),
      });
    }
    const listData = await this.prisma.ap_Batches.findMany({
      skip: skipData,
      take: batchesQueries.limit,
      where: filters.length > 0 ? { AND: filters } : {},
      orderBy: {
        id: batchesQueries.sort === 'newest' ? 'desc' : 'asc',
      },
    });
    const totalBatches = await this.prisma.ap_Batches.count({
      where: filters.length > 0 ? { AND: filters } : {},
    });
    return {
      data: listData,
      paginationInfo: {
        page: batchesQueries.page,
        limit: batchesQueries.limit,
        total: totalBatches,
        totalPages: Math.ceil(totalBatches / batchesQueries.limit),
      },
    };
  }

  async getTotalBatches() {
    return await this.prisma.ap_Batches.count();
  }

  async getAllBatchesOfAgency(
    agencyId: number,
    batchesQueries: BatchesQueries,
  ) {
    const skipData = (batchesQueries.page - 1) * batchesQueries.limit;
    const filters: object[] = [];
    if (
      batchesQueries.status &&
      Object.values(BatchesStatus).includes(batchesQueries.status)
    ) {
      filters.push({
        status: batchesQueries.status.toUpperCase(),
      });
    }
    const listData = await this.prisma.ap_Batches.findMany({
      skip: skipData,
      take: batchesQueries.limit,
      where: {
        AND: [{ agencyId: agencyId }, ...filters],
      },
      orderBy: {
        id: batchesQueries.sort === 'newest' ? 'desc' : 'asc',
      },
    });
    const totalBatches = await this.prisma.ap_Batches.count({
      where: {
        AND: [{ agencyId: agencyId }, ...filters],
      },
    });
    return {
      data: listData,
      paginationInfo: {
        page: batchesQueries.page,
        limit: batchesQueries.limit,
        total: totalBatches,
        totalPages: Math.ceil(totalBatches / batchesQueries.limit),
      },
    };
  }

  async getTotalBatchesOfAgency(agencyId: number) {
    return await this.prisma.ap_Batches.count({
      where: { agencyId: agencyId },
    });
  }

  async getBatchDetail(batchId: number) {
    const data = await this.prisma.ap_Batches.findUnique({
      where: { id: batchId },
      include: {
        agencyOrder: {
          include: {
            orderItems: true,
          },
        },
        apPayment: true,
      },
    });
    if (!data) throw new NotFoundException('Not found this batch');
    return data;
  }

  async getBatchWithOrder(batchId: number) {
    const data = await this.prisma.ap_Batches.findUnique({
      where: { id: batchId },
      include: {
        agencyOrder: true,
      },
    });
    if (!data) throw new NotFoundException('Not found this batch');
    return data;
  }

  async updateBatches(batchesId: number, updateBatchesDto: UpdateBatchesDto) {
    const updatedData = await this.prisma.ap_Batches.update({
      where: { id: batchesId },
      data: updateBatchesDto,
    });
    return updatedData;
  }

  async deleteBatches(batchesId: number) {
    const batch = await this.getBatchDetail(batchesId);
    if (batch.apPayment.length > 0) {
      await this.prisma.ap_Payments.deleteMany({
        where: { apBatchesId: batchesId },
      });
    }
    await this.prisma.ap_Batches.delete({
      where: { id: batchesId },
    });
    return;
  }

  async updateCompleteBatch(batchId: number, agencyId: number, amount: number) {
    const updatedData = await this.prisma.ap_Batches.update({
      where: { id: batchId },
      data: { status: 'CLOSED', amount: amount },
      include: {
        agencyOrder: {
          select: { agencyId: true, subtotal: true },
        },
      },
    });
    await this.creditLineService.addCreditLimit(
      agencyId,
      updatedData.agencyOrder.subtotal,
    );
    return;
  }

  async updatePartialBatch(batchId: number, amount: number) {
    await this.prisma.ap_Batches.update({
      where: { id: batchId },
      data: { status: 'PARTIAL', amount: amount },
      include: {
        agencyOrder: {
          select: { agencyId: true, subtotal: true },
        },
      },
    });
    return;
  }
}
