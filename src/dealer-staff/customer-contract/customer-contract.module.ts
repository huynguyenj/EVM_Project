import { forwardRef, Module } from '@nestjs/common';
import { CustomerContractController } from './customer-contract.controller';
import { CustomerContractService } from './customer-contract.service';
import { MotorbikeModule } from 'src/vehicle/electric-motorbike/motorbike.module';
import { CustomerModule } from '../customer/customer.module';
import { ColorModule } from 'src/vehicle/color/color.module';
import { InstallmentContractModule } from '../installment-contract/installment-contract.module';
import { AgencyStockModule } from 'src/dealer-manager/agency-stock/agency-stock.module';

@Module({
  controllers: [CustomerContractController],
  providers: [CustomerContractService],
  imports: [
    MotorbikeModule,
    CustomerModule,
    ColorModule,
    AgencyStockModule,
    forwardRef(() => InstallmentContractModule),
  ],
  exports: [CustomerContractService],
})
export class CustomerContractModule {}
