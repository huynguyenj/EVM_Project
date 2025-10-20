import { ApiResponseProperty } from '@nestjs/swagger';

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
}
