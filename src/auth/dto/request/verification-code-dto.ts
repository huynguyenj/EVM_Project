import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class VerificationCodeDto {
  @ApiProperty({ example: 154781 })
  @IsNumber()
  @IsNotEmpty()
  code: number;
  @ApiProperty({ example: 'nguyenvana@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
