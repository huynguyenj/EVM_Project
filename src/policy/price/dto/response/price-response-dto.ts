import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { AgencyResponseDto } from 'src/admin/agency/dto';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';

class PricePolicyAgencyName extends PickType(AgencyResponseDto, ['name']) {}
class PricePolicyMotorbikeName extends PickType(MotorbikeResponseDto, [
  'name',
]) {}
export class PriceResponseDto {
  @ApiResponseProperty({ example: 'Wholesale price for the agency' })
  title: string;
  @ApiResponseProperty({
    example: 'Wholesale price will apply when agency import motorbike',
  })
  content: string;
  @ApiResponseProperty({ example: 'Wholesale price for motorbike' })
  policy: string;

  @ApiResponseProperty({ example: 25000 })
  wholesalePrice: number;

  @ApiResponseProperty({ example: 1 })
  agencyId: number;

  @ApiResponseProperty({ example: 1 })
  motorbikeId: number;

  @ApiResponseProperty({ type: PricePolicyAgencyName })
  agency: PricePolicyAgencyName;

  @ApiResponseProperty({ type: PricePolicyMotorbikeName })
  motorbike: PricePolicyMotorbikeName;
}
