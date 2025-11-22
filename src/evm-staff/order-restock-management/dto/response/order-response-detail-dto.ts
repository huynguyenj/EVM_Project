import { ApiResponseProperty } from '@nestjs/swagger';
import { AgencyResponseDto } from 'src/admin/agency/dto';
import { OrderResponseDto } from 'src/dealer-manager/order-restock/dto';

class OrderDetailAgencyManageDto extends AgencyResponseDto {}
class OrderPaymentInfoDto {
  @ApiResponseProperty({ example: 178949 })
  invoiceNumber: number;

  @ApiResponseProperty({ example: 5000000 })
  amount: number;

  @ApiResponseProperty({ example: '2024-01-01T00:00:00.000Z' })
  payAt: Date;
}
export class OrderManageDetailResponseDto extends OrderResponseDto {
  @ApiResponseProperty({ type: OrderDetailAgencyManageDto })
  agency: OrderDetailAgencyManageDto;

  @ApiResponseProperty({ type: [OrderPaymentInfoDto] })
  orderPayments: OrderPaymentInfoDto[];
}
