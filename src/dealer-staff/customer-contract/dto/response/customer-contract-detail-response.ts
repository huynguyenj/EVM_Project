import { StaffResponseDto } from 'src/dealer-manager/staff/dto';
import { CustomerResponseContractDto } from './customer-contract-response-dto';
import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';
import { ColorResponseDto } from 'src/vehicle/color/dto';
import { CustomerResponseDto } from 'src/dealer-staff/customer/dto';

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

export class CustomerContractDetailResponseDto extends CustomerResponseContractDto {
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
