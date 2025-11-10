import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgetPasswordDto {
  @ApiProperty({ example: 'nguyenvana@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class CreateNewPassword {
  @ApiProperty({ example: 'nguyenvana@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: '123456789' })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
