import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'john_doe', description: 'Name of customer' })
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'john.doe@email.com',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '0123456789',
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '123 Main St',
  })
  address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '0144797af9af',
  })
  credentialId?: string;

  @ApiProperty({
    example: '2025-10-12T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dob?: Date;
}
