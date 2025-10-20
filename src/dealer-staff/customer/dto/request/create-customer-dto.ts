import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'john_doe', description: 'Name of customer' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '0123456789',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123 Main St',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '0144797af9af',
  })
  credentialId: string;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  dob: Date;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  agencyId: number;
}
