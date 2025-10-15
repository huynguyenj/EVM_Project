import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBatteryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Lithium-ion', description: 'Type of battery' })
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '60V 30Ah', description: 'Battery capacity' })
  capacity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '4 hours',
    description: 'Time required to fully charge',
  })
  chargeTime: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Fast', description: 'Type of charging supported' })
  chargeType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2kWh/100km',
    description: 'Energy consumption rate',
  })
  energyConsumption: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '100km', description: 'Maximum range limit' })
  limit: string;
}
