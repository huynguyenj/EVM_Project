import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { StockPromotionResponseDto } from './stock-promotion-response';
import { AgencyStockResponse } from 'src/dealer-manager/agency-stock/dto';
import { ColorResponseDto } from 'src/vehicle/color/dto';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';

class ColorStockType extends PickType(ColorResponseDto, [
  'colorType',
] as const) {}
class MotorbikeStockType extends PickType(MotorbikeResponseDto, [
  'id',
  'makeFrom',
  'model',
  'name',
  'version',
] as const) {}
class AgencyStockType extends PickType(AgencyStockResponse, [
  'id',
  'quantity',
  'price',
] as const) {
  @ApiResponseProperty({ type: MotorbikeStockType })
  motorbike: MotorbikeStockType;
  @ApiResponseProperty({ type: ColorStockType })
  color: ColorStockType;
}

class AgencyStockPromotionType {
  @ApiResponseProperty({ type: AgencyStockType })
  agencyStock: AgencyStockType;
}

export class StockPromotionDetailResponseDto extends StockPromotionResponseDto {
  @ApiResponseProperty({ type: [AgencyStockPromotionType] })
  agencyStockPromotion: [AgencyStockPromotionType];
}
