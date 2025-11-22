import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { CustomerResponseDto } from 'src/dealer-staff/customer/dto';
import { DepositResponseDto } from 'src/dealer-staff/deposit/dto';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';
import { ColorResponseDto } from 'src/vehicle/color/dto';
import { QuotationStatus, QuotationType } from '../../types';

class QuotationCustomer extends CustomerResponseDto {}
class QuotationDeposit extends DepositResponseDto {}
class QuotationMotorbike extends PickType(MotorbikeResponseDto, [
  'id',
  'name',
  'model',
  'makeFrom',
  'version',
] as const) {}
export class QuotationDetailResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;
  @ApiResponseProperty({ example: QuotationStatus.DRAFT })
  status: QuotationStatus;
  @ApiResponseProperty({ example: QuotationType.AT_STORE })
  type: string;
  @ApiResponseProperty({ example: 150000 })
  basePrice: number;
  @ApiResponseProperty({ example: 20000 })
  promotionPrice: number;
  @ApiResponseProperty({ example: 10000 })
  finalPrice: number;
  @ApiResponseProperty({ example: '2025-10-12T14:30:00.000Z' })
  validUntil: Date;
  @ApiResponseProperty({ type: QuotationCustomer })
  customer: QuotationCustomer;
  @ApiResponseProperty({ type: QuotationDeposit })
  deposit: QuotationDeposit | null;
  @ApiResponseProperty({ type: QuotationMotorbike })
  motorbike: QuotationMotorbike;
  @ApiResponseProperty({ type: ColorResponseDto })
  color: ColorResponseDto;
}
