import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignIn, CreateAccountDto } from './dto';
import { AuthService } from './auth.service';
import { type Request, type Response } from 'express';
import { Roles } from './decorators/roles.decorators';
import { Role } from './types/role.enum';
import { JwtAuthGuard, RoleGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('create')
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
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
