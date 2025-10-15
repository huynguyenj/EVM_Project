import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAccountDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'john_doe',
    description: 'Username for the account',
  })
  username?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Full name of the staff',
  })
  fullname?: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'john.doe@email.com',
    description: 'Email address of the staff',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '0123456789',
    description: 'Phone number of the staff',
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '123 Main St',
    description: 'Address of the staff',
  })
  address?: string;
}
