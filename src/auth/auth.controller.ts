import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  SetMetadata,
} from '@nestjs/common';
import { SignIn } from './dto';
import { AuthService } from './auth.service';
import { type Request, type Response } from 'express';
import { UserId } from 'src/common/decorator/userId.decorator';
import authConfig from 'src/common/config/auth.config';
import type { ConfigType } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(authConfig.KEY) private authSettings: ConfigType<typeof authConfig>,
  ) {}

  @Post('signin')
  @SetMetadata('public', true)
  async signIn(@Body() signInDto: SignIn, @Res() res: Response) {
    const tokenData = await this.authService.signIn(signInDto);
    res.cookie(this.authSettings.cookiesName, tokenData.refreshToken, {
      httpOnly: false,
      maxAge: this.authSettings.cookiesTime,
    });
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      accessToken: tokenData.accessToken,
    });
  }

  @Get('token')
  @SetMetadata('public', true)
  async getNewAccessToken(@Req() req: Request) {
    const newToken = await this.authService.getNewAccessToken(
      req.cookies.refreshToken as string,
    );
    return {
      accessToken: newToken,
    };
  }

  @Post('logout')
  async logout(@UserId() userId: number, @Res() res: Response) {
    res.clearCookie(this.authSettings.cookiesName);
    await this.authService.deleteToken(userId);
    res.status(200).json();
  }
}
