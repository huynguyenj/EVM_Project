import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  SetMetadata,
} from '@nestjs/common';
import { NewAccessTokenResponse, SignIn, SignInResponseDto } from './dto';
import { AuthService } from './auth.service';
import { type Request, type Response } from 'express';
import { UserId } from 'src/common/decorator/user-decorator/userId.decorator';
import authConfig from 'src/common/config/auth.config';
import type { ConfigType } from '@nestjs/config';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDocument } from 'src/common/decorator/swagger-decorator/api.response.document.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(authConfig.KEY) private authSettings: ConfigType<typeof authConfig>,
  ) {}

  @Post('signin')
  @SetMetadata('public', true)
  @ApiOperation({ summary: 'Login in account' })
  @ApiResponseDocument(HttpStatus.OK, SignInResponseDto, 'Sign in successfully')
  async signIn(@Body() signInDto: SignIn, @Res() res: Response) {
    const tokenData = await this.authService.signIn(signInDto);
    res.cookie(this.authSettings.cookiesName, tokenData.refreshToken, {
      httpOnly: false,
      maxAge: this.authSettings.cookiesTime,
    });
    const response: SignInResponseDto = {
      userId: tokenData.data.id,
      accessToken: tokenData.accessToken,
      role: tokenData.data.role.map((role) => role.role.roleName),
    };
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: response,
    });
  }

  @Get('token')
  @SetMetadata('public', true)
  @ApiOperation({ summary: 'Get new access token when it invalid' })
  @ApiCookieAuth()
  @ApiResponseDocument(
    HttpStatus.CREATED,
    NewAccessTokenResponse,
    'Get new access token success',
  )
  @HttpCode(201)
  async getNewAccessToken(@Req() req: Request) {
    const newToken = await this.authService.getNewAccessToken(
      req.cookies.refreshToken as string,
    );
    return {
      statusCode: HttpStatus.CREATED,
      data: {
        accessToken: newToken,
      },
      message: 'Get new access token success!',
    };
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Logout account' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Logout successfully!')
  @Post('logout')
  async logout(@UserId() userId: number, @Res() res: Response) {
    res.clearCookie(this.authSettings.cookiesName);
    await this.authService.deleteToken(userId);
    res.status(200).json({
      statusCode: HttpStatus.OK,
      message: 'Logout successfully!',
      data: {},
    });
  }
}
