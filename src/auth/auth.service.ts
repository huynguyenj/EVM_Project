import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import authConfig from 'src/config/auth.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { StaffService } from 'src/staff/staff.service';
import { CreateAccountDto, JwtPayload, SignIn } from './dto';
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
  async createAccount(createAccountDto: CreateAccountDto) {
    const isStaffAccountExisted = await this.staffService.getStaffByEmail(
      createAccountDto.email,
    );
    if (isStaffAccountExisted)
      throw new BadRequestException('This email already existed!');
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
    const staffInformation = await this.staffService.getStaffByEmail(
      signInDto.email,
    );

    if (!staffInformation)
      throw new BadRequestException('This account is not existed!');
    const isPasswordMatch = await bcrypt.compare(
      signInDto.password,
      staffInformation.password,
    );
    if (!isPasswordMatch)
      throw new UnauthorizedException('Wrong password please try again!');
    const payload: JwtPayload = {
      userId: staffInformation.id,
      roles: staffInformation.role.map((role) => role.roleId),
    };
    const accessToken = await this.signInAccessToken(payload);
    const refreshToken = await this.signInRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
    };
  }

  async getNewAccessToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken);
    const staffInformation = await this.staffService.getStaffById(
      payload.userId,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }
    const newAccessToken = await this.signInAccessToken({
      userId: 1,
      roles: staffInformation?.role.map((role) => role.roleId) || [],
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
