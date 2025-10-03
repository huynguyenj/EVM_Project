import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateConfigurationDto {
  @IsString()
  @IsNotEmpty()
  motorType: string;

  @IsString()
  @IsNotEmpty()
  speedLimit: string;

  @IsNumber()
  @IsNotEmpty()
  maximumCapacity: number;
}
