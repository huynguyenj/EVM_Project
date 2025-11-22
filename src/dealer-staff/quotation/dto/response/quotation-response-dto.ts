import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { QuotationStatus, QuotationType } from '../../types';
import { CustomerResponseDto } from 'src/dealer-staff/customer/dto';

class CustomerQuoteInfo extends PickType(CustomerResponseDto, [
  'email',
  'name',
]) {}
export class QuotationResponseDto {
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
  @ApiResponseProperty({ example: 1 })
  customerId: number;
  @ApiResponseProperty({ example: 1 })
  motorbikeId: number;
  @ApiResponseProperty({ example: 1 })
  colorId: number;
  @ApiResponseProperty({ example: 1 })
  dealerStaffId: number;
  @ApiResponseProperty({ type: CustomerQuoteInfo })
  customer: CustomerQuoteInfo;
}
