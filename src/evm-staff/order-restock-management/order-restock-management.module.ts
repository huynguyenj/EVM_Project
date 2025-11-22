import { Module } from '@nestjs/common';
import { OrderRestockManagementController } from './order-restock-management.controller';
import { OrderRestockManagementService } from './order-restock-management.service';
import { OrderRestockModule } from 'src/dealer-manager/order-restock/order-restock.module';
import { WarehouseInventoryModule } from '../warehouse-inventory/warehouse-inventory.module';
import { CreditLineModule } from 'src/admin/credit-line/credit-line.module';

@Module({
  imports: [OrderRestockModule, WarehouseInventoryModule, CreditLineModule],
  controllers: [OrderRestockManagementController],
  providers: [OrderRestockManagementService],
  exports: [OrderRestockManagementService],
})
export class OrderRestockManagementModule {}
