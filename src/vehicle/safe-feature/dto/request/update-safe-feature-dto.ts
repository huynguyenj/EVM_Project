import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSafeFeatureDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'ABS' })
  brake?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Smart Lock' })
  lock?: string;
}
