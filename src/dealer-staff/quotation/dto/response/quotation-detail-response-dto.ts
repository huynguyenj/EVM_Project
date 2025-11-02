import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { CustomerResponseDto } from 'src/dealer-staff/customer/dto';
import { DepositResponseDto } from 'src/dealer-staff/deposit/dto';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';
import { QuotationResponseDto } from './quotation-response-dto';
import { ColorResponseDto } from 'src/vehicle/color/dto';

class QuotationCustomer extends CustomerResponseDto {}
class QuotationDeposit extends DepositResponseDto {}
class QuotationMotorbike extends PickType(MotorbikeResponseDto, [
  'id',
  'name',
  'model',
  'makeFrom',
  'version',
] as const) {}
export class QuotationDetailResponseDto extends QuotationResponseDto {
  @ApiResponseProperty({ type: QuotationCustomer })
  customer: QuotationCustomer;
  @ApiResponseProperty({ type: QuotationDeposit })
  deposit: QuotationDeposit | null;
  @ApiResponseProperty({ type: QuotationMotorbike })
  motorbike: QuotationMotorbike;
  @ApiResponseProperty({ type: ColorResponseDto })
  color: ColorResponseDto;
}
