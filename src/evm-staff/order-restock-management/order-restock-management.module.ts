import { Module } from '@nestjs/common';
import { OrderRestockManagementController } from './order-restock-management.controller';
import { OrderRestockManagementService } from './order-restock-management.service';
import { OrderRestockModule } from 'src/dealer-manager/order-restock/order-restock.module';

@Module({
  imports: [OrderRestockModule],
  controllers: [OrderRestockManagementController],
  providers: [OrderRestockManagementService],
  exports: [OrderRestockManagementService],
})
export class OrderRestockManagementModule {}
