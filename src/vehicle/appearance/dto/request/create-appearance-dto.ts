import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppearanceDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 2000, description: 'Length of the vehicle' })
  length: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 700, description: 'Width of the vehicle' })
  width: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1100, description: 'Height of the vehicle' })
  height: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 120, description: 'Weight of the vehicle in kg' })
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 150, description: 'Undercarriage distance' })
  undercarriageDistance: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 30, description: 'Storage limit in liters' })
  storageLimit: number;
}
