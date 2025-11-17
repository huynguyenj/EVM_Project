import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { StockPromotionResponseDto } from 'src/dealer-manager/stock-promotion/dto';
import { ColorResponseDto } from 'src/vehicle/color/dto';
import { MotorbikeDetailResponseDto } from 'src/vehicle/electric-motorbike/dto';
class MotorbikeStockDto extends PickType(MotorbikeDetailResponseDto, [
  'id',
  'name',
  'price',
  'makeFrom',
  'model',
  'version',
  'images',
] as const) {}

export class AgencyStockDetailResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({ example: 10 })
  quantity: number;

  @ApiResponseProperty({ example: 155000 })
  price: number;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    format: 'date-time',
  })
  createAt: Date;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    format: 'date-time',
  })
  updateAt: Date;

  @ApiResponseProperty({ type: [StockPromotionResponseDto] })
  agencyStockPromotion: [StockPromotionResponseDto];

  @ApiResponseProperty({ type: MotorbikeStockDto })
  motorbike: MotorbikeStockDto;

  @ApiResponseProperty({ type: ColorResponseDto })
  color: ColorResponseDto;

  @ApiResponseProperty({
    example:
      'https://mavpbibesdtunlwhiunp.supabase.co/storage/v1/object/public/vehicle_color_image/color/green/PowerStorm%20GT/1762967184023-xe-tay-ga-50cc-osakar-nispa-viva-mau-cam-mo_71d7bee6b84e461e85d0399bc1e4bb99.jpg',
  })
  imageColor: string;
}
