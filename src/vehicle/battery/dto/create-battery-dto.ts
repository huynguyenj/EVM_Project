import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBatteryDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  capacity: string;

  @IsString()
  @IsNotEmpty()
  chargeTime: string;

  @IsString()
  @IsNotEmpty()
  chargeType: string;

  @IsString()
  @IsNotEmpty()
  energyConsumption: string;

  @IsString()
  @IsNotEmpty()
  limit: string;
}
