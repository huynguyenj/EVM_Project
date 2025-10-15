import { ApiResponseProperty } from '@nestjs/swagger';

export class SafeFeatureResponseDto {
  @ApiResponseProperty({ example: 1, type: Number })
  id: number;
  @ApiResponseProperty({ example: 'ABS', type: String })
  brake: string;

  @ApiResponseProperty({ example: 'Smart Lock', type: String })
  lock: string;

  @ApiResponseProperty({ example: 1 })
  motorbikeId: number;
}
