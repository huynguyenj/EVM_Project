import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAppearanceDto {
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 2000,
    description: 'Length of the vehicle',
  })
  length?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 700,
    description: 'Width of the vehicle',
  })
  width?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1100,
    description: 'Height of the vehicle',
  })
  height?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 120,
    description: 'Weight of the vehicle in kg',
  })
  weight?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    example: 150,
    description: 'Undercarriage distance',
  })
  undercarriageDistance?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 30, description: 'Storage limit in liters' })
  storageLimit?: number;
}
