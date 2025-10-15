import { ApiProperty } from '@nestjs/swagger';

export class MotorbikeColorFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  color_image: any;
}
