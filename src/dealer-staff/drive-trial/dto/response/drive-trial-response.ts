import { ApiResponseProperty } from '@nestjs/swagger';
import { DriveTrailStatus } from '../../types';

export class DriveTrailResponse {
  @ApiResponseProperty({ example: 1 })
  id: number;

  @ApiResponseProperty({ example: 'Nguyen Van A' })
  fullname: string;

  @ApiResponseProperty({ example: 'nguyenvana@gmail.com' })
  email: string;

  @ApiResponseProperty({ example: '0787781798' })
  phone: string;

  @ApiResponseProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  driveDate: Date;

  @ApiResponseProperty({
    example: '14:30:00',
  })
  driveTime: string;

  @ApiResponseProperty({ example: DriveTrailStatus.PENDING })
  status: DriveTrailStatus;
}
