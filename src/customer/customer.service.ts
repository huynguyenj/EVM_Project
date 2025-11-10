import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerContractQueries, QuotationQueriesCustomerDto } from './dto';
import { QuotationService } from 'src/dealer-staff/quotation/quotation.service';
import {
  QuotationStatus,
  QuotationType,
} from 'src/dealer-staff/quotation/types';

@Injectable()
export class CustomerService {
  constructor(
    private quotationService: QuotationService,
    private prisma: PrismaService,
  ) {}

  async getContractByCustomer(
    credentialId: string,
    agencyId: number,
    customerQueries: CustomerContractQueries,
  ) {
    const customer = await this.prisma.customer.findFirst({
      where: {
        credentialId: credentialId,
        agencyId: agencyId,
      },
    });
    if (!customer)
      throw new NotFoundException(
        'Your credentialId is not existed in this agency',
      );
    const skipData = (customerQueries.page - 1) * customerQueries.limit;
    const contracts = await this.prisma.customer_Contract.findMany({
      skip: skipData,
      take: customerQueries.limit,
      where: {
        customerId: customer.id,
      },
      include: {
        installmentContract: true,
        contractDocuments: true,
        quotation: true,
      },
    });
    return {
      data: contracts,
      paginationInfo: {
        page: customerQueries.page,
        limit: customerQueries.limit,
        total: await this.getTotalCustomerContract(agencyId),
      },
    };
  }

  async getTotalCustomerContract(customerId: number) {
    return await this.prisma.customer_Contract.count({
      where: {
        customerId: customerId,
      },
    });
  }

  async getDetailInstallmentContract(installmentContractId: number) {
    const installmentContract =
      await this.prisma.installment_Contract.findUnique({
        where: {
          id: installmentContractId,
        },
        select: {
          installmentPayments: true,
        },
      });
    if (!installmentContract)
      throw new NotFoundException('Installment Contract not found');
    return installmentContract;
  }

  async getListQuotationForCustomer(
    credentialId: string,
    quotationQueries: QuotationQueriesCustomerDto,
  ) {
    const skipData = (quotationQueries.page - 1) * quotationQueries.limit;
    const filters: object[] = [];
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

    if (quotationQueries.quoteCode) {
      filters.push({
        quoteCode: {
          contains: quotationQueries.quoteCode,
        },
      });
    }

    if (quotationQueries.agencyId) {
      filters.push({
        agencyId: Number(quotationQueries.agencyId),
      });
    }

    const listData = await this.prisma.quotation.findMany({
      skip: skipData,
      take: quotationQueries.limit,
      where: {
        AND: [
          {
            customer: {
              credentialId: credentialId,
            },
          },
          ...filters,
        ],
      },
    });
    return {
      data: listData,
      paginationInfo: {
        page: quotationQueries.page,
        limit: quotationQueries.limit,
        total: await this.getTotalCustomerQuotation(credentialId),
      },
    };
  }

  async getTotalCustomerQuotation(credentialId: string) {
    return await this.prisma.quotation.count({
      where: { customer: { credentialId: credentialId } },
    });
  }

  async getDepositForCustomer(quotationId: number) {
    const deposit = await this.prisma.deposit.findUnique({
      where: { quotationId: quotationId },
    });
    return deposit;
  }
}
