import { ApiResponseProperty, OmitType } from '@nestjs/swagger';
import { AgencyResponseDto } from 'src/admin/agency/dto';
import { MotorbikeResponseDto } from 'src/vehicle/electric-motorbike/dto';

export class PriceDetailResponseDto {
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

  @ApiResponseProperty({ type: AgencyResponseDto })
  agency: AgencyResponseDto;

  @ApiResponseProperty({ type: OmitType(MotorbikeResponseDto, ['images']) })
  motorbike: MotorbikeResponseDto;
}
