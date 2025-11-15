import { ApiResponseProperty } from '@nestjs/swagger';

export class ContractFullPaymentResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({ example: 1 })
  period: number;

  @ApiResponseProperty({ example: 150000 })
  amount: number;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    format: 'date-time',
  })
  createAt: Date;

  @ApiResponseProperty({
    example: null,
  })
  paidAt: Date;

  @ApiResponseProperty({ example: 1 })
  customerContractId: number;
}
