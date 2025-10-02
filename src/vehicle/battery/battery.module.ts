import { Module } from '@nestjs/common';
import { BatteryService } from './battery.service';
import { BatteryController } from './battery.controller';

@Module({
  providers: [BatteryService],
  controllers: [BatteryController]
})
export class BatteryModule {}
