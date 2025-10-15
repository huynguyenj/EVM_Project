import { PickType } from '@nestjs/swagger';
import { SignInResponseDto } from './sign-in-response-dto';

export class NewAccessTokenResponse extends PickType(SignInResponseDto, [
  'accessToken',
] as const) {}
