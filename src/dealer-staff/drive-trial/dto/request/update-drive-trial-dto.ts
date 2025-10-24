import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { DriveTrailStatus } from '../../types';

export class UpdateDriveTrailDto {
  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString()
  @IsOptional()
  fullname: string;

  @ApiProperty({ example: 'nguyenvana@gmail.com' })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ example: '0787781798' })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  driveDate: Date;

  @ApiProperty({
    example: '14:30:00',
  })
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'Drive time must be in hh:mm:ss format',
  })
  driveTime: string;

  @ApiProperty({ example: DriveTrailStatus.ACCEPTED })
  @IsEnum(DriveTrailStatus)
  @IsOptional()
  status: DriveTrailStatus;
}
