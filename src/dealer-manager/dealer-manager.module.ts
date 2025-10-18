import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { OrderRestockModule } from './order-restock/order-restock.module';

@Module({
  imports: [StaffModule, OrderRestockModule],
})
export class DealerManagerModule {}
