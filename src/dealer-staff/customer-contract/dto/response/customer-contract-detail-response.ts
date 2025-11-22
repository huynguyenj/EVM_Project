import { StaffResponseDto } from 'src/dealer-manager/staff/dto';
import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';
import { ColorResponseDto } from 'src/vehicle/color/dto';
import { CustomerResponseDto } from 'src/dealer-staff/customer/dto';
import { ContractPaidType, ContractStatus, ContractType } from '../../types';

class StaffCustomerContractDto extends PickType(StaffResponseDto, [
  'id',
  'email',
  'username',
] as const) {}

class ElectricMotorbikeCustomerContractDto extends PickType(
  MotorbikeResponseDto,
  ['id', 'name', 'makeFrom', 'model', 'version'] as const,
) {}

export class DocumentCustomerContract {
  @ApiResponseProperty({ example: 1 })
  id: string;
  @ApiResponseProperty({ example: 'Credential document' })
  documentType: string;
  @ApiResponseProperty({ example: 'http://example.com/document.png' })
  imageUrl: string;
}

export class CustomerContractDetailResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({ example: 'Contract for motorbike with customer John' })
  title: string;

  @ApiResponseProperty({ example: 'd9cffc50-de6c-44eb-9fee-4576eefd86d6' })
  contractCode: string;

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
  signDate: Date;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  deliveryDate: Date;

  @ApiResponseProperty({ example: ContractPaidType.FULL })
  contractPaidType: ContractPaidType;

  @ApiResponseProperty({ example: ContractType.AT_STORE })
  type: ContractType;

  @ApiResponseProperty({ example: ContractStatus.PENDING })
  status: ContractStatus;

  @ApiResponseProperty({ example: 116488 })
  finalPrice: number;
  @ApiResponseProperty({ type: StaffCustomerContractDto })
  staff: StaffCustomerContractDto;

  @ApiResponseProperty({ type: ElectricMotorbikeCustomerContractDto })
  electricMotorbike: ElectricMotorbikeCustomerContractDto;

  @ApiResponseProperty({ type: ColorResponseDto })
  color: ColorResponseDto;

  @ApiResponseProperty({ type: CustomerResponseDto })
  customer: CustomerResponseDto;

  @ApiResponseProperty({ type: [DocumentCustomerContract] })
  contractDocuments: DocumentCustomerContract[];
}
