import { ApiResponseProperty } from '@nestjs/swagger';

export class ColorResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: string;
  @ApiResponseProperty({ example: 'red' })
  colorType: string;
}
