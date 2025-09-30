import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  fullname?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  phone?: string;

  address?: string;

  avatar?: string;

  @IsArray()
  role?: number[];
}
