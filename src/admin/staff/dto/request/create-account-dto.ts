import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'john_doe', description: 'Username for the account' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'securePassword123',
    description: 'Password for the account',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the staff',
    required: false,
  })
  fullname?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'Email address of the staff',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '0123456789',
    description: 'Phone number of the staff',
    required: false,
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '123 Main St',
    description: 'Address of the staff',
    required: false,
  })
  address?: string;

  @IsArray()
  @ApiProperty({
    example: [1, 2],
    description: 'Array of role IDs assigned to the staff',
  })
  role: number[];
}
