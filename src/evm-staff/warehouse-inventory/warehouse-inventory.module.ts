import { Module } from '@nestjs/common';
import { WarehouseInventoryController } from './warehouse-inventory.controller';
import { WarehouseInventoryService } from './warehouse-inventory.service';

@Module({
  controllers: [WarehouseInventoryController],
  providers: [WarehouseInventoryService],
  exports: [WarehouseInventoryService],
})
export class WarehouseInventoryModule {}
