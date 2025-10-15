import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBatteryDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Lithium-ion',
    description: 'Type of battery',
  })
  type?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '60V 30Ah', description: 'Battery capacity' })
  capacity?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '4 hours',
    description: 'Time required to fully charge',
  })
  chargeTime?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Fast',
    description: 'Type of charging supported',
  })
  chargeType?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '2kWh/100km',
    description: 'Energy consumption rate',
  })
  energyConsumption?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '100km', description: 'Maximum range limit' })
  limit?: string;
}
