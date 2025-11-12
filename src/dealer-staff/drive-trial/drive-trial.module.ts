import { forwardRef, Module } from '@nestjs/common';
import { DriveTrialService } from './drive-trial.service';
import { DriveTrialController } from './drive-trial.controller';
import { MotorbikeModule } from 'src/vehicle/electric-motorbike/motorbike.module';
import { AgencyModule } from 'src/admin/agency/agency.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  providers: [DriveTrialService],
  controllers: [DriveTrialController],
  imports: [MotorbikeModule, AgencyModule, forwardRef(() => EmailModule)],
  exports: [DriveTrialService],
})
export class DriveTrialModule {}
