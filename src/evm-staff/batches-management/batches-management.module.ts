import { Module } from '@nestjs/common';
import { BatchesManagementController } from './batches-management.controller';
import { BatchesManagementService } from './batches-management.service';

@Module({
  controllers: [BatchesManagementController],
  providers: [BatchesManagementService]
})
export class BatchesManagementModule {}
