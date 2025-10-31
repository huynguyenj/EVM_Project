import { ApiResponseProperty } from '@nestjs/swagger';
import { BillEnum } from '../../types';

export class OrderBillResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;
  @ApiResponseProperty({ example: 1276000 })
  amount: number;
  @ApiResponseProperty({ example: '2025-10-12T14:30:00.000Z' })
  createAt: Date;

  @ApiResponseProperty({ example: null })
  paidAt: Date;

  @ApiResponseProperty({ example: BillEnum.FULL })
  type: BillEnum;
  @ApiResponseProperty({ example: false })
  isCompleted: boolean;
}
