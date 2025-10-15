import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMotorbikeDto {
  @ApiPropertyOptional({ example: 'EV Superbike' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 150000 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: 'High performance electric motorbike' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'Model X' })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({ example: 'Vietnam' })
  @IsString()
  @IsOptional()
  makeFrom?: string;

  @ApiPropertyOptional({ example: '2025' })
  @IsString()
  @IsOptional()
  version?: string;
}
