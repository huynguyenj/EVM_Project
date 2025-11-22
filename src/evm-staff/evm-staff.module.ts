import { Module } from '@nestjs/common';
import { WarehouseInventoryModule } from './warehouse-inventory/warehouse-inventory.module';
import { OrderRestockManagementModule } from './order-restock-management/order-restock-management.module';
// import { BatchesManagementModule } from './batches-management/batches-management.module';

@Module({
  imports: [
    WarehouseInventoryModule,
    OrderRestockManagementModule,
    // BatchesManagementModule,
  ],
})
export class EvmStaffModule {}
