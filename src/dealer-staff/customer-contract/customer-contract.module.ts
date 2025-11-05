import { forwardRef, Module } from '@nestjs/common';
import { CustomerContractController } from './customer-contract.controller';
import { CustomerContractService } from './customer-contract.service';
import { MotorbikeModule } from 'src/vehicle/electric-motorbike/motorbike.module';
import { CustomerModule } from '../customer/customer.module';
import { ColorModule } from 'src/vehicle/color/color.module';
import { InstallmentContractModule } from '../installment-contract/installment-contract.module';

@Module({
  controllers: [CustomerContractController],
  providers: [CustomerContractService],
  imports: [
    MotorbikeModule,
    CustomerModule,
    ColorModule,
    forwardRef(() => InstallmentContractModule),
  ],
  exports: [CustomerContractService],
})
export class CustomerContractModule {}
