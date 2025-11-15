import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepositDto, UpdateDepositDto } from './dto';
import { QuotationService } from '../quotation/quotation.service';

@Injectable()
export class DepositService {
  constructor(
    private quotationService: QuotationService,
    private prisma: PrismaService,
  ) {}

  async createDeposit(createDepositDto: CreateDepositDto) {
    await this.quotationService.getQuotationById(createDepositDto.quotationId);
    const isDepositExist = await this.prisma.deposit.findUnique({
      where: { quotationId: createDepositDto.quotationId },
    });
    const quotation = await this.quotationService.getQuotationBasicById(
      createDepositDto.quotationId,
    );
    if (isDepositExist)
      throw new BadRequestException(
        'Deposit already exists for this quotation',
      );

    if (createDepositDto.depositAmount > quotation.finalPrice)
      throw new BadRequestException(
        'Your deposit amount is higher than quotation final price, please try again!',
      );
    return await this.prisma.deposit.create({
      data: createDepositDto,
    });
  }

  async getDepositById(depositId: number) {
    const deposit = await this.prisma.deposit.findUnique({
      where: { id: depositId },
    });
    if (!deposit) throw new NotFoundException('Deposit not found');
    return deposit;
  }

  async updateDeposit(depositId: number, updateDeposit: UpdateDepositDto) {
    const depositData = await this.getDepositById(depositId);

    if (depositData.status === 'EXPIRED')
      throw new BadRequestException(
        'This deposit is expired and can not be edited.',
      );

    const updatedData = await this.prisma.deposit.update({
      where: { id: depositId },
      data: updateDeposit,
    });
    return updatedData;
  }

  async deleteDeposit(depositId: number) {
    await this.getDepositById(depositId);
    return await this.prisma.deposit.delete({
      where: { id: depositId },
    });
  }

  async updateDepositPayment(depositId: number) {
    await this.prisma.deposit.update({
      where: { id: depositId },
      data: { status: 'APPLIED' },
    });
    // await this.quotationService.minusQuotationWithDeposit(
    //   updatedDeposit.quotationId,
    //   updatedDeposit.depositAmount,
    // );
  }
}
