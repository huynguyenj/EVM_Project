import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { type SignIn, type CreateAccount } from './dto';
import { AuthService } from './auth.service';
import { type Request, type Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('create')
  async createAccount(@Body() createAccountDto: CreateAccount) {
    const data = await this.authService.createAccount(createAccountDto);
    return {
      data: data,
      message: 'Create account successfully',
    };
  }
  @Post('signin')
  async signIn(@Body() signInDto: SignIn, @Res() res: Response) {
    const tokenData = await this.authService.signIn(signInDto);
    res.cookie('refreshToken', tokenData.refreshToken);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      accessToken: tokenData.accessToken,
    });
  }
  @Get('token')
  async getNewAccessToken(@Req() req: Request) {
    const newToken = await this.authService.getNewAccessToken(
      req.cookies.refreshToken as string,
    );
    return {
      accessToken: newToken,
    };
  }
}
