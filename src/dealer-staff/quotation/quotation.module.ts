import { Module } from '@nestjs/common';
import { QuotationController } from './quotation.controller';
import { QuotationService } from './quotation.service';
import { MotorbikeModule } from 'src/vehicle/electric-motorbike/motorbike.module';
import { ColorModule } from 'src/vehicle/color/color.module';
import { CustomerModule } from '../customer/customer.module';
import { StaffModule } from 'src/admin/staff/staff.module';

@Module({
  imports: [MotorbikeModule, ColorModule, CustomerModule, StaffModule],
  controllers: [QuotationController],
  providers: [QuotationService],
  exports: [QuotationService],
})
export class QuotationModule {}
