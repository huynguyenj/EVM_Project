import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCustomerContractDto,
  CustomerContractQueries,
  UpdateCustomerContractDto,
} from './dto';
import { ContractStatus, ContractType } from './types';
import { MotorbikeService } from 'src/vehicle/electric-motorbike/motorbike.service';
import { CustomerService } from '../customer/customer.service';
import { ColorService } from 'src/vehicle/color/color.service';
import { v4 as uuidv4 } from 'uuid';
import { InstallmentContractService } from '../installment-contract/installment-contract.service';

@Injectable()
export class CustomerContractService {
  constructor(
    private prisma: PrismaService,
    private motorbikeService: MotorbikeService,
    private customerService: CustomerService,
    private colorService: ColorService,
    @Inject(forwardRef(() => InstallmentContractService))
    private installmentContractService: InstallmentContractService,
  ) {}

  async createCustomerContract(
    createCustomerContract: CreateCustomerContractDto,
  ) {
    const staffInfo = await this.prisma.staff.findUnique({
      where: {
        id: createCustomerContract.staffId,
      },
      include: {
        role: {
          include: {
            role: {
              select: {
                roleName: true,
              },
            },
          },
        },
      },
    });
    if (!staffInfo) throw new NotFoundException('This staff is not found');
    if (staffInfo.agencyId !== createCustomerContract.agencyId)
      throw new BadRequestException(
        'This staff is not from this agency. Please provide the right staff and agency',
      );
    await this.customerService.getCustomerDetail(
      createCustomerContract.customerId,
    );
    await this.motorbikeService.getMotorbikeDetail(
      createCustomerContract.electricMotorbikeId,
    );
    await this.colorService.getColorById(createCustomerContract.colorId);
    await this.motorbikeService.getMotorbikeColor(
      createCustomerContract.electricMotorbikeId,
      createCustomerContract.colorId,
    );
    const contractCode = uuidv4();
    const createdData = await this.prisma.customer_Contract.create({
      data: {
        ...createCustomerContract,
        contractCode: contractCode,
      },
    });
    return createdData;
  }

  async getListCustomerContract(
    agencyId: number,
    customerContractQueries: CustomerContractQueries,
  ) {
    const skipData =
      (customerContractQueries.page - 1) * customerContractQueries.limit;
    const filters: any[] = [{ agencyId: agencyId }];
    if (
      customerContractQueries.contractType &&
      Object.values(ContractType).includes(customerContractQueries.contractType)
    ) {
      filters.push({
        contractType: customerContractQueries.contractType.toUpperCase(),
      });
    }
    if (
      customerContractQueries.status &&
      Object.values(ContractStatus).includes(customerContractQueries.status)
    ) {
      filters.push({
        status: customerContractQueries.status.toUpperCase(),
      });
    }

    if (customerContractQueries.customerId) {
      filters.push({
        customerId: Number(customerContractQueries.customerId),
      });
    }

    if (customerContractQueries.staffId) {
      filters.push({
        staffId: Number(customerContractQueries.staffId),
      });
    }

    const listData = await this.prisma.customer_Contract.findMany({
      skip: skipData,
      take: customerContractQueries.limit,
      where: filters.length > 0 ? { AND: filters } : {},
    });
    return {
      data: listData,
      paginationInfo: {
        page: customerContractQueries.page,
        limit: customerContractQueries.limit,
        total: await this.getTotalCustomerContract(agencyId),
      },
    };
  }

  async getTotalCustomerContract(agencyId: number) {
    return await this.prisma.customer_Contract.count({
      where: {
        agencyId: agencyId,
      },
    });
  }

  async getCustomerContractDetail(contractId: number) {
    const data = await this.prisma.customer_Contract.findUnique({
      where: {
        id: contractId,
      },
      include: {
        staff: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
        electricMotorbike: {
          select: {
            id: true,
            name: true,
            model: true,
            version: true,
            makeFrom: true,
          },
        },
        contractDocuments: true,
        color: true,
        customer: true,
      },
    });
    if (!data) throw new NotFoundException('Not found customer contract');
    return data;
  }

  async getCustomerContractTotalAmount(customerContractId: number) {
    const data = await this.prisma.customer_Contract.findUnique({
      where: {
        id: customerContractId,
      },
      select: {
        finalPrice: true,
      },
    });
    if (!data)
      throw new NotFoundException('This customer contract is not existed!');
    return data;
  }

  async updateCustomerContract(
    contractId: number,
    updateCustomerContractDto: UpdateCustomerContractDto,
  ) {
    const updatedData = await this.prisma.customer_Contract.update({
      where: {
        id: contractId,
      },
      data: updateCustomerContractDto,
    });
    await this.prisma.customer_Contract.update({
      where: {
        id: contractId,
      },
      data: updateCustomerContractDto,
    });
    return updatedData;
  }

  async deleteCustomerContract(contractId: number) {
    const installmentContract =
      await this.installmentContractService.getInstallmentContractByCustomerContractForDelete(
        contractId,
      );
    if (installmentContract) {
      await this.installmentContractService.deleteInstallmentContract(
        installmentContract.id,
      );
    }
    await this.prisma.customer_Contract.delete({
      where: {
        id: contractId,
      },
    });
    return;
  }
}
