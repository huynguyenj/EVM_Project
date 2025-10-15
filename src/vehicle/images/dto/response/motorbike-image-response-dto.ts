import { ApiResponseProperty } from '@nestjs/swagger';

export class ImageMotorbikeResponse {
  @ApiResponseProperty({ example: 1, type: Number })
  id: number;

  @ApiResponseProperty({
    example:
      'https://mavpbibesdtunlwhiunp.supabase.co/storage/v1/object/public/vehicle_color_image/common/SHS%20elec/thien-nhien-la-gi-1.jpg',
    type: String,
  })
  imageUrl: string;
}
