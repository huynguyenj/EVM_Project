import { Module } from '@nestjs/common';
import { WarehouseInventoryModule } from './warehouse-inventory/warehouse-inventory.module';

@Module({
  imports: [WarehouseInventoryModule],
})
export class EvmStaffModule {}
