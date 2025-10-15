import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateColorDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'red' })
  colorType?: string;
}
