import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto, CustomerQueries, UpdateCustomerDto } from './dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const isCustomerExisted = await this.prisma.customer.findUnique({
      where: {
        credentialId_email_agencyId: {
          agencyId: createCustomerDto.agencyId,
          credentialId: createCustomerDto.credentialId,
          email: createCustomerDto.email,
        },
      },
    });
    if (isCustomerExisted)
      throw new BadRequestException(
        'This email and credential id already created in this agency!',
      );
    const createdData = await this.prisma.customer.create({
      data: createCustomerDto,
    });
    return createdData;
  }

  async getListCustomer(agencyId: number, customerQueries: CustomerQueries) {
    const skipData = (customerQueries.page - 1) * customerQueries.limit;
    const listData = await this.prisma.customer.findMany({
      skip: skipData,
      take: customerQueries.limit,
      where: {
        AND: [{ agencyId: agencyId }],
      },
      orderBy: {
        id: customerQueries.sort === 'newest' ? 'desc' : 'asc',
      },
    });
    const totalCustomers = await this.getTotalCustomer(agencyId);
    return {
      data: listData,
      paginationInfo: {
        page: customerQueries.page,
        limit: customerQueries.limit,
        total: totalCustomers,
        totalPages: Math.ceil(totalCustomers / customerQueries.limit),
      },
    };
  }

  async getTotalCustomer(agencyId: number) {
    return await this.prisma.customer.count({
      where: {
        agencyId: agencyId,
      },
    });
  }

  async getCustomerDetail(customerId: number) {
    const data = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });
    if (!data) throw new NotFoundException('Not found this customer');
    return data;
  }

  async updateCustomer(
    customerId: number,
    updateCustomerDto: UpdateCustomerDto,
  ) {
    const updatedData = await this.prisma.customer.update({
      where: {
        id: customerId,
      },
      data: updateCustomerDto,
    });
    return updatedData;
  }

  async deleteCustomer(customerId: number) {
    const isCustomerHaveContract = await this.prisma.customer_Contract.findMany(
      {
        where: {
          customerId: customerId,
        },
      },
    );
    if (isCustomerHaveContract.length > 0)
      throw new BadRequestException('This customer already have contract');
    const isCustomerHaveQuotation = await this.prisma.quotation.findMany({
      where: {
        customerId: customerId,
      },
    });
    if (isCustomerHaveQuotation.length > 0)
      throw new BadRequestException(
        'This customer have quotations. Delete quotations of this customer first.',
      );
    await this.prisma.customer.delete({
      where: {
        id: customerId,
      },
    });
    return;
  }
}
