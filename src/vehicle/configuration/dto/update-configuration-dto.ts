import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateConfigurationDto {
  @IsString()
  @IsOptional()
  motorType?: string;

  @IsString()
  @IsOptional()
  speedLimit?: string;

  @IsNumber()
  @IsOptional()
  maximumCapacity?: number;
}
