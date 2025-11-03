import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BatchesQueries, CreateBatchesDto, UpdateBatchesDto } from './dto';
import { BatchesStatus } from './types';

@Injectable()
export class BatchesManagementService {
  constructor(private prisma: PrismaService) {}

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
    const listData = await this.prisma.price_Policy.findMany({
      skip: skipData,
      take: batchesQueries.limit,
      where: filters.length > 0 ? { AND: filters } : {},
    });
    return {
      data: listData,
      paginationInfo: {
        page: batchesQueries.page,
        limit: batchesQueries.limit,
        total: await this.getTotalBatches(),
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
    const filters: any[] = [{ agencyId: agencyId }];
    if (
      batchesQueries.status &&
      Object.values(BatchesStatus).includes(batchesQueries.status)
    ) {
      filters.push({
        status: batchesQueries.status.toUpperCase(),
      });
    }
    const listData = await this.prisma.price_Policy.findMany({
      skip: skipData,
      take: batchesQueries.limit,
      where: filters.length > 0 ? { AND: filters } : {},
    });
    return {
      data: listData,
      paginationInfo: {
        page: batchesQueries.page,
        limit: batchesQueries.limit,
        total: await this.getTotalBatchesOfAgency(agencyId),
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
    await this.prisma.ap_Payments.deleteMany({
      where: { apBatchesId: batchesId },
    });
    await this.prisma.ap_Batches.delete({
      where: { id: batchesId },
    });
    return;
  }
}
