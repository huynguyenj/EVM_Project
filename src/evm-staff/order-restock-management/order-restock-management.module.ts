import { Module } from '@nestjs/common';
import { OrderRestockManagementController } from './order-restock-management.controller';
import { OrderRestockManagementService } from './order-restock-management.service';

@Module({
  controllers: [OrderRestockManagementController],
  providers: [OrderRestockManagementService],
})
export class OrderRestockManagementModule {}
