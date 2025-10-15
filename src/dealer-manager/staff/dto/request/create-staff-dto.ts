import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Username for staff account',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'StrongPass123!',
    description: 'Password for staff account',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Full name of the staff member',
  })
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the staff',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    example: '+84123456789',
    description: 'Phone number of the staff',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    example: '123 Nguyen Trai, Hanoi, Vietnam',
    description: 'Address of the staff member',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
    description: 'Avatar URL of the staff',
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    example: 2,
    description: 'Role ID assigned to this staff member',
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({
    example: 1,
    description: 'Agency ID where the staff belongs',
  })
  @IsNumber()
  @IsNotEmpty()
  agencyId: number;
}
