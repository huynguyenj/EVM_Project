import { ApiResponseProperty } from '@nestjs/swagger';

export class BatteryResponseDto {
  @ApiResponseProperty({ example: 1, type: Number })
  id: string;
  @ApiResponseProperty({ example: 'Lithium-ion', type: String })
  type: string;

  @ApiResponseProperty({ example: '60V 30Ah', type: String })
  capacity: string;

  @ApiResponseProperty({ example: '4 hours', type: String })
  chargeTime: string;

  @ApiResponseProperty({ example: 'Fast', type: String })
  chargeType: string;

  @ApiResponseProperty({ example: '2kWh/100km', type: String })
  energyConsumption: string;

  @ApiResponseProperty({ example: '100km', type: String })
  limit: string;

  @ApiResponseProperty({ example: 1, type: Number })
  motorbikeId: number;
}
