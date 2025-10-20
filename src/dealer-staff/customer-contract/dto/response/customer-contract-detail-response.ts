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

export class CustomerContractDetailResponseDto extends CustomerResponseContractDto {
  @ApiResponseProperty({ type: StaffCustomerContractDto })
  staff: StaffCustomerContractDto;

  @ApiResponseProperty({ type: ElectricMotorbikeCustomerContractDto })
  electricMotorbike: ElectricMotorbikeCustomerContractDto;

  @ApiResponseProperty({ type: ColorResponseDto })
  color: ColorResponseDto;

  @ApiResponseProperty({ type: CustomerResponseDto })
  customer: CustomerResponseDto;
}
