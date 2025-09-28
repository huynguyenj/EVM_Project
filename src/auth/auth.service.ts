import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import authConfig from 'src/config/auth.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { StaffService } from 'src/staff/staff.service';
import { CreateAccount, JwtPayload, SignIn } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject(authConfig.KEY)
    private authSettings: ConfigType<typeof authConfig>,
    private staffService: StaffService,
    private jwtService: JwtService,
  ) {}
  async createAccount(createAccountDto: CreateAccount) {
    const data = {
      ...createAccountDto,
      password: await this.hashPassword(createAccountDto.password),
    };
    return await this.staffService.createStaff(data);
  }
  async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(
      password,
      this.authSettings.hashSalt,
    );
    return hashPassword;
  }

  async signIn(signInDto: SignIn) {
    const payload: JwtPayload = {
      userId: 1,
      role: 'admin',
    };
    const accessToken = await this.signInAccessToken(payload);
    const refreshToken = await this.signInRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
    };
  }

  async getNewAccessToken(refreshToken: string) {
    const isValid = await this.jwtService.verifyAsync<JwtPayload>(refreshToken);
    console.log(isValid);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    const newAccessToken = await this.signInAccessToken({
      userId: 1,
      role: 'admin',
    });
    return newAccessToken;
  }

  async signInAccessToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.authSettings.jwtAccessTokenExpired,
    });
  }

  async signInRefreshToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.authSettings.jwtRefreshTokenExpired,
    });
  }
}
