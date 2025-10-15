import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignIn {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    default: 'abc@gmail.com',
    description: 'Điền email của bạn vào',
    type: String,
  })
  email: string;

  @IsString()
  @ApiProperty({ default: '123456789' })
  password: string;
}
