import { Module } from '@nestjs/common';
import { ContractFullPaymentController } from './contract-full-payment.controller';
import { ContractFullPaymentService } from './contract-full-payment.service';
import { CustomerContractModule } from '../customer-contract/customer-contract.module';

@Module({
  controllers: [ContractFullPaymentController],
  providers: [ContractFullPaymentService],
  imports: [CustomerContractModule],
  exports: [ContractFullPaymentService],
})
export class ContractFullPaymentModule {}
