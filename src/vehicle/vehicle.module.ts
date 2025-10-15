import { Module } from '@nestjs/common';
import { MotorbikeModule } from './electric-motorbike/motorbike.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ColorModule } from './color/color.module';
import { AppearanceModule } from './appearance/appearance.module';
import { SafeFeatureModule } from './safe-feature/safe-feature.module';
import { BatteryModule } from './battery/battery.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    MotorbikeModule,
    ConfigurationModule,
    ColorModule,
    AppearanceModule,
    SafeFeatureModule,
    BatteryModule,
    ImagesModule,
  ],
})
export class VehicleModule {}
