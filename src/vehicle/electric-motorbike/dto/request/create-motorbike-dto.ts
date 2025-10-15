import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMotorbikeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'EV Superbike', example: 'EV Superbike' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 150000, example: 150000 })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    default: 'High performance electric motorbike',
    example: 'High performance electric motorbike',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Model X', example: 'Model X' })
  model: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Vietnam', example: 'Vietnam' })
  makeFrom: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '2025', example: '2025' })
  version: string;
}
