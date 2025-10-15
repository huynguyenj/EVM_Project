import { ApiResponseProperty } from '@nestjs/swagger';
import { AppearanceResponseDto } from 'src/vehicle/appearance/dto';
import { BatteryResponseDto } from 'src/vehicle/battery/dto';
import { ConfigurationResponseDto } from 'src/vehicle/configuration/dto';
import {
  ImageMotorbikeResponse,
  MotorbikeColorImageResponseDto,
} from 'src/vehicle/images/dto';
import { SafeFeatureResponseDto } from 'src/vehicle/safe-feature/dto';

export class MotorbikeResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;
  @ApiResponseProperty({ example: 'EV Superbike' })
  name: string;

  @ApiResponseProperty({ example: 150000 })
  price: number;

  @ApiResponseProperty({ example: 'High performance electric motorbike' })
  description: string;

  @ApiResponseProperty({ example: 'Model X' })
  model: string;

  @ApiResponseProperty({ example: 'Vietnam' })
  makeFrom: string;

  @ApiResponseProperty({ example: '2025' })
  version: string;

  @ApiResponseProperty({ type: AppearanceResponseDto })
  appearance: AppearanceResponseDto;

  @ApiResponseProperty({ type: ConfigurationResponseDto })
  configuration: ConfigurationResponseDto;

  @ApiResponseProperty({ type: BatteryResponseDto })
  battery: BatteryResponseDto;

  @ApiResponseProperty({ type: SafeFeatureResponseDto })
  safeFeature: SafeFeatureResponseDto;

  @ApiResponseProperty({ type: [MotorbikeColorImageResponseDto] })
  colors: MotorbikeColorImageResponseDto[];

  @ApiResponseProperty({ type: [ImageMotorbikeResponse] })
  images: ImageMotorbikeResponse[];
}
