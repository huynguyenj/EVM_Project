import { Module } from '@nestjs/common';
import { CustomerContractModule } from './customer-contract/customer-contract.module';
import { CustomerModule } from './customer/customer.module';
import { InstallmentContractModule } from './installment-contract/installment-contract.module';
import { DriveTrialModule } from './drive-trial/drive-trial.module';
import { QuotationModule } from './quotation/quotation.module';
import { DepositModule } from './deposit/deposit.module';

@Module({
  imports: [
    CustomerContractModule,
    CustomerModule,
    InstallmentContractModule,
    DriveTrialModule,
    QuotationModule,
    DepositModule,
  ],
})
export class DealerStaffModule {}
