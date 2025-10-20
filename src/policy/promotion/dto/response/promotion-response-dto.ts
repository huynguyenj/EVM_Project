import { ApiResponseProperty } from '@nestjs/swagger';
import { PromotionValueType, PromotionStatus } from '../../types';

export class PromotionResponseDto {
  @ApiResponseProperty({ example: 'Woman day celebrate' })
  name: string;

  @ApiResponseProperty({
    example: 'For all makeup items will sale at 10% - 20%',
  })
  description: string;

  @ApiResponseProperty({
    example: PromotionValueType.PERCENT,
  })
  value_type: PromotionValueType;

  @ApiResponseProperty({
    example: 10,
  })
  value: number;

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
    enum: PromotionStatus,
    example: PromotionStatus.ACTIVE,
  })
  status: PromotionStatus;

  @ApiResponseProperty({ example: 1 })
  agencyId?: number;

  @ApiResponseProperty({ example: 1 })
  motorbikeId?: number;
}
