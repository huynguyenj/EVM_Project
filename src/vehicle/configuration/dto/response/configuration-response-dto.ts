import { ApiResponseProperty } from '@nestjs/swagger';

export class ConfigurationResponseDto {
  @ApiResponseProperty({ example: 1, type: Number })
  id: number;

  @ApiResponseProperty({ example: 'Brushless DC', type: String })
  motorType: string;

  @ApiResponseProperty({ example: '80km/h', type: String })
  speedLimit: string;

  @ApiResponseProperty({ example: 2, type: Number })
  maximumCapacity: number;

  @ApiResponseProperty({ example: 1, type: Number })
  electricMotorbikeId: number;
}
