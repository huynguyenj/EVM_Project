import { Module } from '@nestjs/common';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { QuotationModule } from '../quotation/quotation.module';

@Module({
  imports: [QuotationModule],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
