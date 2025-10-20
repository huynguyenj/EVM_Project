import { Module } from '@nestjs/common';
import { CustomerContractModule } from './customer-contract/customer-contract.module';
import { CustomerModule } from './customer/customer.module';
import { InstallmentContractModule } from './installment-contract/installment-contract.module';

@Module({
  imports: [CustomerContractModule, CustomerModule, InstallmentContractModule],
})
export class DealerStaffModule {}
