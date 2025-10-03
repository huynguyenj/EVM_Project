import { IsNotEmpty, IsObject } from 'class-validator';
import { CreateAppearanceDto } from 'src/vehicle/appearance/dto';
import { CreateBatteryDto } from 'src/vehicle/battery/dto';
import { CreateConfigurationDto } from 'src/vehicle/configuration/dto';
import { CreateSafeFeatureDto } from 'src/vehicle/safe-feature/dto';

export class CreateMotorbikeViewDto {
  @IsObject()
  @IsNotEmpty()
  appearance: CreateAppearanceDto;

  @IsObject()
  @IsNotEmpty()
  configuration: CreateConfigurationDto;

  @IsObject()
  @IsNotEmpty()
  battery: CreateBatteryDto;

  @IsObject()
  @IsNotEmpty()
  safeFeature: CreateSafeFeatureDto;
}
