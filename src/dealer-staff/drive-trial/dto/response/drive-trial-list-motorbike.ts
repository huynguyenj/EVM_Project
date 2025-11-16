import { ApiResponseProperty } from '@nestjs/swagger';

export class DriveTrialListMotorbike {
  @ApiResponseProperty({ example: 1 })
  id: number;
  @ApiResponseProperty({ example: 'Electric V' })
  name: string;
}
