import { ApiResponseProperty } from '@nestjs/swagger';

export class AppearanceResponseDto {
  @ApiResponseProperty({ example: 1, type: Number })
  id: number;
  @ApiResponseProperty({ example: 2000, type: Number })
  length: number;

  @ApiResponseProperty({ example: 700, type: Number })
  width: number;

  @ApiResponseProperty({ example: 1100, type: Number })
  height: number;

  @ApiResponseProperty({ example: 120, type: Number })
  weight: number;

  @ApiResponseProperty({ example: 150, type: Number })
  undercarriageDistance: number;

  @ApiResponseProperty({ example: 30, type: Number })
  storageLimit: number;

  @ApiResponseProperty({ example: 1, type: Number })
  electricMotorbikeId: number;
}
