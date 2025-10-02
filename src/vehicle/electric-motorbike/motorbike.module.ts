import { Module } from '@nestjs/common';
import { MotorbikeService } from './motorbike.service';
import { MotorbikeController } from './motorbike.controller';

@Module({
  providers: [MotorbikeService],
  controllers: [MotorbikeController],
})
export class MotorbikeModule {}
