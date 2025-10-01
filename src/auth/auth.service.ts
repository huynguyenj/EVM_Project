import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import authConfig from 'src/config/auth.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { StaffService } from 'src/staff/staff.service';
import { CreateAccountDto, SignIn } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt.payload';

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

  async signIn(signInDto: SignIn) {
    const staffInfo = await this.staffService.getStaffByEmail(signInDto.email);
    if (!staffInfo) throw new NotFoundException('This account is not existed!');
    const isPasswordMatch = await bcrypt.compare(
      signInDto.password,
      staffInfo.password,
    );
    if (!isPasswordMatch)
      throw new UnauthorizedException('Wrong password please try again!');
    const payload: JwtPayload = {
      userId: staffInfo.id,
      roles: staffInfo.roleNames,
    };
    const accessToken = await this.signInAccessToken(payload);
    const refreshToken = await this.signInRefreshToken(payload);
    await this.saveToken(staffInfo.id, accessToken, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(id: number, accessToken: string, refreshToken: string) {
    const isTokenWithIdExisted = await this.prisma.token.findUnique({
      where: {
        staffId: id,
      },
    });
    if (isTokenWithIdExisted) {
      await this.prisma.token.update({
        where: {
          staffId: id,
        },
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          createAt: new Date(),
        },
      });
    } else {
      await this.prisma.token.create({
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          createAt: new Date(),
          staffId: id,
        },
      });
    }
    return;
  }

  async deleteToken(id: number) {
    await this.prisma.token.delete({
      where: {
        staffId: id,
      },
    });
    return;
  }
  async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(
      password,
      this.authSettings.hashSalt,
    );
    return hashPassword;
  }

  async getToken(id: number) {
    const tokens = await this.prisma.token.findUnique({
      where: {
        staffId: id,
      },
    });
    return {
      accessToken: tokens?.accessToken,
      refreshToken: tokens?.refreshToken,
    };
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

  async getNewAccessToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(
      refreshToken,
      { secret: this.authSettings.jwtSecret },
    );
    if (!payload) throw new UnauthorizedException();
    const staffInfo = await this.staffService.getStaffById(payload.userId);
    if (!staffInfo) throw new NotFoundException('Account is not found!');
    const newAccessToken = await this.signInAccessToken({
      userId: staffInfo.id,
      roles: staffInfo.roleNames,
    });
    return newAccessToken;
  }
}
