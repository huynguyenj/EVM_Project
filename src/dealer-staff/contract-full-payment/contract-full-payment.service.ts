import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerContractService } from '../customer-contract/customer-contract.service';
import {
  CreateContractFullPaymentDto,
  UpdateContractFullPaymentDto,
} from './dto';

@Injectable()
export class ContractFullPaymentService {
  constructor(
    private customerContractService: CustomerContractService,
    private prisma: PrismaService,
  ) {}

  async createCustomerContractPayment(
    createCustomerContractPaymentDto: CreateContractFullPaymentDto,
  ) {
    const customerContractData =
      await this.customerContractService.getCustomerContractById(
        createCustomerContractPaymentDto.customerContractId,
      );

    if (customerContractData.contractPaidType !== 'FULL')
      throw new BadRequestException(
        'This contract is debt type not full type. Can not be created. ',
      );

    const createdData = await this.prisma.contract_Full_Payments.create({
      data: createCustomerContractPaymentDto,
    });
    return createdData;
  }

  async getListCustomerContractFullPaymentByContractId(contractId: number) {
    const listData = await this.prisma.contract_Full_Payments.findMany({
      where: { customerContractId: contractId },
    });
    return listData;
  }

  async getCustomerContractFullPaymentById(id: number) {
    const data = await this.prisma.contract_Full_Payments.findUnique({
      where: { id },
    });
    if (!data) throw new NotFoundException('Can not found the payments');
    return data;
  }

  async updateContractFullPayment(
    id: number,
    updateContractFullPaymentDto: UpdateContractFullPaymentDto,
  ) {
    const updatedData = await this.prisma.contract_Full_Payments.update({
      where: { id },
      data: updateContractFullPaymentDto,
    });
    return updatedData;
  }

  async updatePayment(id: number) {
    await this.prisma.contract_Full_Payments.update({
      where: { id },
      data: {
        paidAt: new Date(),
      },
    });
    return;
  }

  async deleteContractFullPayment(id: number) {
    await this.prisma.contract_Full_Payments.delete({
      where: { id },
    });
    return;
  }
}
