import { ApiResponseProperty } from '@nestjs/swagger';
import { StockPromotionStatus, StockPromotionValueType } from '../../types';

export class StockPromotionResponseDto {
  @ApiResponseProperty({
    example: 1,
  })
  id: number;

  @ApiResponseProperty({ example: 'Woman day celebrate' })
  name: string;

  @ApiResponseProperty({
    example: 'For all makeup items will sale at 10% - 20%',
  })
  description: string;

  @ApiResponseProperty({
    example: StockPromotionValueType.PERCENT,
  })
  value_type: StockPromotionValueType;

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
    enum: StockPromotionStatus,
    example: StockPromotionStatus.ACTIVE,
  })
  status: StockPromotionStatus;
}
