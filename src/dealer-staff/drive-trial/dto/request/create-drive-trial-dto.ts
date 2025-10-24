import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateDriveTrailDto {
  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ example: 'nguyenvana@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '0787781798' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  driveDate: Date;

  @ApiProperty({
    example: '14:30:00',
  })
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'Drive time must be in hh:mm:ss format',
  })
  driveTime: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  motorbikeId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  agencyId: number;
}
