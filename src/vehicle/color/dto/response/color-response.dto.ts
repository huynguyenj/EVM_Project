import { ApiResponseProperty } from '@nestjs/swagger';

export class ColorResponseDto {
  @ApiResponseProperty({ example: 1 })
  id: number;
  @ApiResponseProperty({ example: 'red' })
  colorType: string;
}
