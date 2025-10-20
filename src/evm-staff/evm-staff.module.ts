import { Module } from '@nestjs/common';
import { WarehouseInventoryModule } from './warehouse-inventory/warehouse-inventory.module';
import { OrderRestockManagementModule } from './order-restock-management/order-restock-management.module';

@Module({
  imports: [WarehouseInventoryModule, OrderRestockManagementModule],
})
export class EvmStaffModule {}
