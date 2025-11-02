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
    if (isDepositExist)
      throw new BadRequestException(
        'Deposit already exists for this quotation',
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
}
