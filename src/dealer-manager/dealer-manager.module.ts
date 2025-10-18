import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { OrderRestockModule } from './order-restock/order-restock.module';
import { AgencyStockModule } from './agency-stock/agency-stock.module';

@Module({
  imports: [StaffModule, OrderRestockModule, AgencyStockModule],
})
export class DealerManagerModule {}
