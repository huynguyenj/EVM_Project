import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateQuotationDto,
  QuotationQueriesDto,
  UpdateQuotationDto,
} from './dto';
import { v4 as uuidv4 } from 'uuid';
import { QuotationStatus, QuotationType } from './types';
import { StaffService } from 'src/admin/staff/staff.service';
import { MotorbikeService } from 'src/vehicle/electric-motorbike/motorbike.service';
import { ColorService } from 'src/vehicle/color/color.service';
import { CustomerService } from '../customer/customer.service';
@Injectable()
export class QuotationService {
  constructor(
    private staffService: StaffService,
    private motorbikeService: MotorbikeService,
    private colorService: ColorService,
    private customerService: CustomerService,
    private prisma: PrismaService,
  ) {}

  async createQuotation(createQuotationDto: CreateQuotationDto) {
    await this.staffService.getStaffByIdAdmin(createQuotationDto.dealerStaffId);
    await this.motorbikeService.getMotorbikeDetail(
      createQuotationDto.motorbikeId,
    );
    await this.colorService.getColorById(createQuotationDto.colorId);
    await this.customerService.getCustomerDetail(createQuotationDto.customerId);
    const quoteCode = uuidv4();
    return await this.prisma.quotation.create({
      data: {
        ...createQuotationDto,
        status: 'DRAFT',
        quoteCode: quoteCode,
      },
    });
  }

  async getListQuotation(
    agencyId: number,
    quotationQueries: QuotationQueriesDto,
  ) {
    const skipData = (quotationQueries.page - 1) * quotationQueries.limit;
    const filters: any[] = [];
    if (
      quotationQueries.type &&
      Object.values(QuotationType).includes(quotationQueries.type)
    ) {
      filters.push({
        type: quotationQueries.type.toUpperCase(),
      });
    }
    if (
      quotationQueries.status &&
      Object.values(QuotationStatus).includes(quotationQueries.status)
    ) {
      filters.push({
        status: quotationQueries.status.toUpperCase(),
      });
    }

    if (quotationQueries.customerId) {
      filters.push({
        customerId: Number(quotationQueries.customerId),
      });
    }
    if (quotationQueries.quoteCode) {
      filters.push({
        quoteCode: {
          contains: quotationQueries.quoteCode,
        },
      });
    }
    const listData = await this.prisma.quotation.findMany({
      skip: skipData,
      take: quotationQueries.limit,
      where: filters.length > 0 ? { AND: filters } : {},
    });
    return {
      data: listData,
      paginationInfo: {
        page: quotationQueries.page,
        limit: quotationQueries.limit,
        total: await this.getTotalQuotation(agencyId),
      },
    };
  }

  async getTotalQuotation(agencyId: number) {
    return await this.prisma.quotation.count({
      where: { agencyId: agencyId },
    });
  }

  async getQuotationById(quotationId: number) {
    const data = await this.prisma.quotation.findUnique({
      where: { id: quotationId },
      include: {
        customer: true,
        deposit: true,
        motorbike: {
          select: {
            id: true,
            name: true,
            model: true,
            makeFrom: true,
            version: true,
          },
        },
        color: true,
      },
    });
    if (!data) throw new NotFoundException('Quotation not found');
    return data;
  }

  async getQuotationBasicById(quotationId: number) {
    const data = await this.prisma.quotation.findUnique({
      where: { id: quotationId },
    });
    if (!data) throw new NotFoundException('Quotation not found');
    return data;
  }

  async updateQuotation(quotationId: number, updateData: UpdateQuotationDto) {
    return await this.prisma.quotation.update({
      where: { id: quotationId },
      data: updateData,
    });
  }

  async deleteQuotation(quotationId: number) {
    return await this.prisma.quotation.delete({
      where: { id: quotationId },
    });
  }

  async minusQuotationWithDeposit(quotationId: number, depositAmount: number) {
    const quotationData = await this.getQuotationById(quotationId);
    await this.prisma.quotation.update({
      where: { id: quotationId },
      data: {
        finalPrice: quotationData.finalPrice - depositAmount,
      },
    });
  }
}
