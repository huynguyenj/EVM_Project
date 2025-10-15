import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateStaffDto {
  @ApiPropertyOptional({
    example: 'john_doe_updated',
    description: 'Updated username of the staff member',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    example: 'John Doe Updated',
    description: 'Updated full name of the staff member',
  })
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiPropertyOptional({
    example: 'john.doe.new@example.com',
    description: 'Updated email address of the staff member',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: '+84987654321',
    description: 'Updated phone number of the staff member',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    example: '456 Tran Hung Dao, Ho Chi Minh City, Vietnam',
    description: 'Updated address of the staff member',
  })
  @IsString()
  @IsOptional()
  address?: string;

  // @ApiPropertyOptional({
  //   example: 'https://example.com/new-avatar.jpg',
  //   description: 'Updated avatar URL of the staff member',
  // })
  // @IsString()
  // @IsOptional()
  // avatar?: string;
}
