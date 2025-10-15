import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateConfigurationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Brushless DC' })
  motorType?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '80km/h' })
  speedLimit?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 2 })
  maximumCapacity?: number;
}
