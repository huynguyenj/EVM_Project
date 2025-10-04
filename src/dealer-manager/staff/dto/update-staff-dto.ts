import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateStaffDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  fullname?: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
