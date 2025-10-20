import { Module } from '@nestjs/common';
import { InstallmentPlanController } from './installment-plan.controller';
import { InstallmentPlanService } from './installment-plan.service';

@Module({
  controllers: [InstallmentPlanController],
  providers: [InstallmentPlanService],
  exports: [InstallmentPlanService],
})
export class InstallmentPlanModule {}
