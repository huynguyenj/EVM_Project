import { IsOptional, IsString } from 'class-validator';

export class UpdateBatteryDto {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  capacity?: string;

  @IsString()
  @IsOptional()
  chargeTime?: string;

  @IsString()
  @IsOptional()
  chargeType?: string;

  @IsString()
  @IsOptional()
  energyConsumption?: string;

  @IsString()
  @IsOptional()
  limit?: string;
}
