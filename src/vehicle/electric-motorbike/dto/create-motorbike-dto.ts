import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMotorbikeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  makeFrom: string;

  @IsString()
  @IsNotEmpty()
  version: string;
}
