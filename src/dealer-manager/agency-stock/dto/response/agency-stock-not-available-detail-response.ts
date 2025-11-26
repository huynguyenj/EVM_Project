import { ApiResponseProperty, OmitType, PickType } from '@nestjs/swagger';
import { ColorResponseDto } from 'src/vehicle/color/dto';
import { MotorbikeDetailResponseDto } from 'src/vehicle/electric-motorbike/dto';

class NotAvailableStockMotorbikeDetail extends OmitType(
  MotorbikeDetailResponseDto,
  ['colors'],
) {}
class NotAvailableStockMotorbikeColorDetail extends PickType(ColorResponseDto, [
  'colorType',
]) {}
export class AgencyStockNotAvailableDetailResponse {
  @ApiResponseProperty({ type: NotAvailableStockMotorbikeDetail })
  motorbike: NotAvailableStockMotorbikeDetail;
  @ApiResponseProperty({
    example:
      'https://mavpbibesdtunlwhiunp.supabase.co/storage/v1/object/public/vehicle_color_image/color/red/SilentFox%20Street/1763273240310-Xe-may-dien-Vespa-LX-Latina.jpg',
  })
  imageUrl: string;

  @ApiResponseProperty({ type: NotAvailableStockMotorbikeColorDetail })
  color: NotAvailableStockMotorbikeColorDetail;
}
