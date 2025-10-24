import { Module } from '@nestjs/common';
import { DriveTrialService } from './drive-trial.service';
import { DriveTrialController } from './drive-trial.controller';
import { MotorbikeModule } from 'src/vehicle/electric-motorbike/motorbike.module';
import { AgencyModule } from 'src/admin/agency/agency.module';

@Module({
  providers: [DriveTrialService],
  controllers: [DriveTrialController],
  imports: [MotorbikeModule, AgencyModule],
})
export class DriveTrialModule {}
