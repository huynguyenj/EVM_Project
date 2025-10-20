import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerContractService } from '../customer-contract/customer-contract.service';
import {
  CreateInstallmentContractDto,
  UpdateInstallmentContractDto,
  UpdateInstallmentPaymentDto,
} from './dto';
import { InstallmentPlanService } from 'src/dealer-manager/installment-plan/installment-plan.service';
import { InterestPaymentStrategyFactory } from './strategies';

@Injectable()
export class InstallmentContractService {
  constructor(
    private prisma: PrismaService,
    private customerContractService: CustomerContractService,
    private installmentPlanService: InstallmentPlanService,
  ) {}

  async createInstallmentContract(
    createInstallmentContractDto: CreateInstallmentContractDto,
  ) {
    const customerContract =
      await this.customerContractService.getCustomerContractTotalAmount(
        createInstallmentContractDto.customerContractId,
      );
    const installmentPlan =
      await this.installmentPlanService.getInstallmentPlanDetail(
        createInstallmentContractDto.installmentPlanId,
      );
    const prePaidTotal = this.calculatePrePaidTotal(
      customerContract.finalAmount,
      installmentPlan.prePaidPercent,
      installmentPlan.processFee,
    );

    const totalPaidDebt = this.calculateTotalDebt(
      customerContract.finalAmount,
      prePaidTotal,
    );
    const createdData = await this.prisma.installment_Contract.create({
      data: {
        startAt: createInstallmentContractDto.startDate,
        penaltyType: createInstallmentContractDto.penaltyType,
        penaltyValue: createInstallmentContractDto.penaltyValue,
        prePaidTotal: prePaidTotal,
        totalDebtPaid: totalPaidDebt,
        customerContractId: createInstallmentContractDto.customerContractId,
        installmentPlanId: createInstallmentContractDto.installmentPlanId,
        status: createInstallmentContractDto.status,
      },
    });
    return createdData;
  }

  calculatePrePaidTotal(
    finalAmount: number,
    prePaidPercent: number,
    processFee: number,
  ) {
    return finalAmount * (prePaidPercent / 100) - processFee;
  }
  calculateTotalDebt(finalAmount: number, prePaidTotal: number) {
    return finalAmount - prePaidTotal;
  }

  async generateInterest(installmentContractId: number) {
    const interestContract = await this.prisma.installment_Contract.findUnique({
      where: {
        id: installmentContractId,
      },
      include: {
        installmentPlan: true,
      },
    });
    if (!interestContract)
      throw new NotFoundException(
        'Not found this interest to generate interest',
      );
    const interestStrategy = InterestPaymentStrategyFactory.getInterestStrategy(
      interestContract.installmentPlan.interestPaidType,
    );
    const interestPaymentData = interestStrategy.generateSchedulePayment({
      totalDebt: interestContract.totalDebtPaid,
      interestRate: interestContract.installmentPlan.interestRate,
      rateMonths: interestContract.installmentPlan.interestRateTotalMonth,
      startDate: interestContract.startAt,
      totalMonths: interestContract.installmentPlan.totalPaidMonth,
      contractId: interestContract.id,
    });
    const isInterestPaymentsExisted =
      await this.prisma.installment_Payment.findMany({
        where: {
          installmentContractId: installmentContractId,
        },
      });
    if (isInterestPaymentsExisted.length > 0)
      throw new BadRequestException(
        'This installment contract already have payment process!',
      );
    const createdData = await this.prisma.installment_Payment.createMany({
      data: interestPaymentData,
    });
    return createdData;
  }

  async getInstallmentContractByCustomerContractId(customerContractId: number) {
    const data = await this.prisma.installment_Contract.findUnique({
      where: {
        customerContractId: customerContractId,
      },
    });
    if (!data)
      throw new NotFoundException(
        'Can not found installment contract with this customer contract',
      );
    return data;
  }

  async getInstallmentContractDetail(installmentContractId: number) {
    const data = await this.prisma.installment_Contract.findUnique({
      where: {
        id: installmentContractId,
      },
      include: {
        installmentPayments: true,
        customerContract: true,
        installmentPlan: true,
      },
    });
    if (!data)
      throw new NotFoundException('Can not found installment contract');
    return data;
  }

  async getInstallmentPaymentDetail(installmentPaymentId: number) {
    const data = await this.prisma.installment_Payment.findUnique({
      where: {
        id: installmentPaymentId,
      },
    });
    if (!data) throw new NotFoundException('Can not found installment payment');
    return data;
  }

  async updateInstallmentContract(
    installmentContractId: number,
    updateInstallmentContractDto: UpdateInstallmentContractDto,
  ) {
    const updatedData = await this.prisma.installment_Contract.update({
      where: {
        id: installmentContractId,
      },
      data: updateInstallmentContractDto,
    });
    return updatedData;
  }

  async updateInstallmentPayment(
    installmentPaymentId: number,
    updateInstallmentPaymentDto: UpdateInstallmentPaymentDto,
  ) {
    const updatedData = await this.prisma.installment_Payment.update({
      where: {
        id: installmentPaymentId,
      },
      data: updateInstallmentPaymentDto,
    });
    return updatedData;
  }
  async deleteInstallmentContract(installmentContractId: number) {
    await this.prisma.installment_Payment.deleteMany({
      where: {
        installmentContractId: installmentContractId,
      },
    });
    await this.prisma.installment_Contract.delete({
      where: {
        id: installmentContractId,
      },
    });
    return;
  }

  async deleteInstallmentPayment(installmentPaymentId: number) {
    await this.prisma.installment_Payment.delete({
      where: {
        id: installmentPaymentId,
      },
    });
    return;
  }
}
