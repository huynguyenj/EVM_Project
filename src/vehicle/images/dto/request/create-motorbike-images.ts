import { ApiProperty } from '@nestjs/swagger';

export class MotorbikeImages {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  images: any;
}
