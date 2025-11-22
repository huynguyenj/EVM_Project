import { ApiResponseProperty, OmitType, PickType } from '@nestjs/swagger';
import { AgencyResponseDto } from 'src/admin/agency/dto';
import { OrderResponseDto } from 'src/dealer-manager/order-restock/dto';

class OrderAgencyInfoDto extends PickType(AgencyResponseDto, ['name']) {}
export class OrderManageResponseDto extends OmitType(OrderResponseDto, [
  'orderItems',
]) {
  @ApiResponseProperty({ type: OrderAgencyInfoDto })
  agency: OrderAgencyInfoDto;
}
