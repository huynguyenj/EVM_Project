import { Module } from '@nestjs/common';
import { InstallmentContractController } from './installment-contract.controller';
import { InstallmentContractService } from './installment-contract.service';
import { CustomerContractModule } from '../customer-contract/customer-contract.module';
import { InstallmentPlanModule } from 'src/dealer-manager/installment-plan/installment-plan.module';

@Module({
  controllers: [InstallmentContractController],
  providers: [InstallmentContractService],
  imports: [CustomerContractModule, InstallmentPlanModule],
})
export class InstallmentContractModule {}
