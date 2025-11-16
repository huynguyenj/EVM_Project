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

    if (
      createCustomerContractPaymentDto.amount > customerContractData.finalPrice
    )
      throw new BadRequestException(
        'Payment can not greater than the price in contract',
      );

    const paidAmount = await this.calculateRestAmount(customerContractData.id);
    if (createCustomerContractPaymentDto.amount > paidAmount)
      throw new BadRequestException(
        `This contract already paid ${paidAmount}. The rest need to paid is ${customerContractData.finalPrice - paidAmount}. Please try another amount that suitable`,
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

  async calculateRestAmount(customerContractId: number) {
    const listPayments = await this.prisma.contract_Full_Payments.findMany({
      where: {
        customerContractId: customerContractId,
        NOT: {
          paidAt: null,
        },
      },
    });
    return listPayments.reduce((total, payment) => {
      return total + payment.amount;
    }, 0);
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
