import { Module } from '@nestjs/common';
import { AgencyStockController } from './agency-stock.controller';
import { AgencyStockService } from './agency-stock.service';
import { MotorbikeModule } from 'src/vehicle/electric-motorbike/motorbike.module';

@Module({
  imports: [MotorbikeModule],
  controllers: [AgencyStockController],
  providers: [AgencyStockService],
})
export class AgencyStockModule {}
