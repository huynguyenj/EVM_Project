import { ApiResponseProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiResponseProperty({
    example: 'abc',
  })
  accessToken: string;
  @ApiResponseProperty({
    example: 1,
  })
  userId: number;
  @ApiResponseProperty({
    example: ['Admin', 'User'],
  })
  role: string[];
}
