import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { QuotationModule } from 'src/dealer-staff/quotation/quotation.module';

@Module({
  imports: [QuotationModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
