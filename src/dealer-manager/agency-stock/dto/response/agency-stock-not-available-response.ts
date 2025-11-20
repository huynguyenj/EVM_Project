import { ApiResponseProperty } from '@nestjs/swagger';

export class AgencyStockNotAvailableResponse {
  @ApiResponseProperty({ example: 39 })
  id: number;

  @ApiResponseProperty({ example: 'UrbanSwift E-City' })
  name: string;

  @ApiResponseProperty({ example: 78000 })
  price: number;

  @ApiResponseProperty({
    example: 'Compact electric bike perfect for city commute',
  })
  description: string;

  @ApiResponseProperty({ example: 'EC-100' })
  model: string;

  @ApiResponseProperty({ example: 'Vietnam' })
  makeFrom: string;

  @ApiResponseProperty({ example: '2024' })
  version: string;

  @ApiResponseProperty({ example: false })
  isDeleted: boolean;

  @ApiResponseProperty({
    example:
      'https://mavpbibesdtunlwhiunp.supabase.co/storage/v1/object/public/vehicle_color_image/common/UrbanSwift%20E-City/xe-may-dien-vinfast-evo-200-1-1663743428.jpg',
  })
  imageUrl: string;
  @ApiResponseProperty({ example: 1 })
  colorId: number;
}
