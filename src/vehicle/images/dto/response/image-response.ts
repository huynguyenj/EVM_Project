import { ApiResponseProperty } from '@nestjs/swagger';

export class ImageResponse {
  @ApiResponseProperty({
    example:
      'https://mavpbibesdtunlwhiunp.supabase.co/storage/v1/object/public/vehicle_color_image/color/red/SHS%20elec/1760492212315-thien-nhien-la-gi-1.jpg',
  })
  imageUrl: string;
}
