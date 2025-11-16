import { ApiResponseProperty } from '@nestjs/swagger';

export class AgencyStockListDetailResponse {
  @ApiResponseProperty({ example: 13 })
  id: number;

  @ApiResponseProperty({ example: 190000 })
  price: number;

  @ApiResponseProperty({ example: 2 })
  quantity: number;

  @ApiResponseProperty({
    example: '2025-11-15T00:00:00.000Z',
    format: 'date-time',
  })
  createAt: Date;

  @ApiResponseProperty({
    example: '2025-11-15T00:00:00.000Z',
    format: 'date-time',
  })
  updateAt: Date;

  @ApiResponseProperty({ example: 1 })
  agencyId: number;

  @ApiResponseProperty({ example: 40 })
  motorbikeId: number;

  @ApiResponseProperty({ example: 1 })
  colorId: number;

  @ApiResponseProperty({ example: 'PowerStorm GT' })
  name: string;

  @ApiResponseProperty({
    example: 'High torque electric motorcycle for racing',
  })
  description: string;

  @ApiResponseProperty({ example: 'GT-X' })
  model: string;

  @ApiResponseProperty({ example: 'Germany' })
  makeFrom: string;

  @ApiResponseProperty({ example: '2025' })
  version: string;

  @ApiResponseProperty({
    example:
      'https://mavpbibesdtunlwhiunp.supabase.co/storage/v1/object/public/vehicle_color_image/color/green/PowerStorm%20GT/1762967184023-xe-tay-ga-50cc-osakar-nispa-viva-mau-cam-mo_71d7bee6b84e461e85d0399bc1e4bb99.jpg',
  })
  imageUrl: string;

  @ApiResponseProperty({ example: 'green' })
  colorType: string;
}
