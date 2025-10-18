import { ApiResponseProperty } from '@nestjs/swagger';
import { DiscountType, DiscountStatus, ValueType } from '../../types';
import { AgencyResponseDto } from 'src/admin/agency/dto';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';

export class DiscountDetailResponseDto {
  @ApiResponseProperty({
    example: 1,
  })
  id: number;

  @ApiResponseProperty({ example: 'Buy 100 elv motorbike' })
  name: string;

  @ApiResponseProperty({
    enum: DiscountType,
    example: DiscountType.SPECIAL,
  })
  type: DiscountType;

  @ApiResponseProperty({
    enum: ValueType,
    example: ValueType.PERCENT,
  })
  value_type: ValueType;

  @ApiResponseProperty({
    example: 10,
  })
  value: number;

  @ApiResponseProperty({
    example: 100,
  })
  min_quantity: number;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  startAt: Date;
  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  endAt: Date;

  @ApiResponseProperty({
    enum: DiscountStatus,
    example: DiscountStatus.ACTIVE,
  })
  status: DiscountStatus;

  @ApiResponseProperty({ type: AgencyResponseDto })
  agency: AgencyResponseDto;

  @ApiResponseProperty({ type: MotorbikeResponseDto })
  motorbike: MotorbikeResponseDto;
}
