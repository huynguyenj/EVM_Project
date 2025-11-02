import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerContractQueries } from './dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

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
}
