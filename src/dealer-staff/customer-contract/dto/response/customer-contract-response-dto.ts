import { ApiResponseProperty } from '@nestjs/swagger';
import { ContractPaidType, ContractStatus, ContractType } from '../../types';

export class CustomerResponseContractDto {
  @ApiResponseProperty({ example: 'Contract for motorbike with customer John' })
  title: string;

  @ApiResponseProperty({ example: 'Contract create for motorbike' })
  content: string;

  @ApiResponseProperty({ example: 155000 })
  totalAmount: number;

  @ApiResponseProperty({ example: 10000 })
  depositAmount: number;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  createAt: Date;

  @ApiResponseProperty({ example: ContractPaidType.FULL })
  contractType: ContractType;

  @ApiResponseProperty({ example: ContractType.AT_STORE })
  type: ContractType;

  @ApiResponseProperty({ example: ContractStatus.PENDING })
  status: ContractStatus;

  @ApiResponseProperty({ example: 1 })
  customerId: number;

  @ApiResponseProperty({ example: 1 })
  staffId: number;

  @ApiResponseProperty({ example: 1 })
  agencyId: number;

  @ApiResponseProperty({ example: 1 })
  motorbikeId: number;

  @ApiResponseProperty({ example: 1 })
  colorId: number;
}
