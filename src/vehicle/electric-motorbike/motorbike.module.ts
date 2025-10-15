import { Module } from '@nestjs/common';
import { MotorbikeService } from './motorbike.service';
import { MotorbikeController } from './motorbike.controller';
import { ConfigurationModule } from '../configuration/configuration.module';
import { AppearanceModule } from '../appearance/appearance.module';
import { ColorModule } from '../color/color.module';
import { BatteryModule } from '../battery/battery.module';
import { SafeFeatureModule } from '../safe-feature/safe-feature.module';

@Module({
  providers: [MotorbikeService],
  controllers: [MotorbikeController],
  imports: [
    ConfigurationModule,
    AppearanceModule,
    ColorModule,
    BatteryModule,
    SafeFeatureModule,
  ],
  exports: [MotorbikeService],
})
export class MotorbikeModule {}
