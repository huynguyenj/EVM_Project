import { ApiResponseProperty } from '@nestjs/swagger';
import { ImageMotorbikeResponse } from 'src/vehicle/images/dto';

export class MotorbikeResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;
  @ApiResponseProperty({ example: 'EV Superbike' })
  name: string;

  @ApiResponseProperty({ example: 150000 })
  price: number;

  @ApiResponseProperty({ example: 'High performance electric motorbike' })
  description: string;

  @ApiResponseProperty({ example: 'Model X' })
  model: string;

  @ApiResponseProperty({ example: 'Vietnam' })
  makeFrom: string;

  @ApiResponseProperty({ example: '2025' })
  version: string;

  @ApiResponseProperty({ example: false })
  isDeleted: boolean;

  @ApiResponseProperty({ type: [ImageMotorbikeResponse] })
  images: ImageMotorbikeResponse[];
}
