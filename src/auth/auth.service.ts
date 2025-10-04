import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import authConfig from 'src/common/config/auth.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignIn } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject(authConfig.KEY)
    private authSettings: ConfigType<typeof authConfig>,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignIn) {
    const staffInfo = await this.validateEmail(signInDto.email);
    if (!staffInfo) throw new NotFoundException('This account is not existed!');
    const isPasswordMatch = await bcrypt.compare(
      signInDto.password,
      staffInfo.password,
    );
    if (!isPasswordMatch)
      throw new UnauthorizedException('Wrong password please try again!');
    const payload: JwtPayload = {
      userId: staffInfo.id,
      roles: staffInfo.role.map((role) => role.role.roleName),
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
    await this.prisma.token.update({
      where: {
        staffId: id,
      },
      data: {
        accessToken: undefined,
        refreshToken: undefined,
      },
    });
    return;
  }
  async hashPassword(password: string) {
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
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        { secret: this.authSettings.jwtSecret },
      );
      const staffInfo = await this.validateId(payload.userId);
      if (!staffInfo) throw new NotFoundException('Account is not found!');
      const newAccessToken = await this.signInAccessToken({
        userId: staffInfo.id,
        roles: staffInfo.role.map((role) => role.role.roleName),
      });
      return newAccessToken;
    } catch {
      throw new UnauthorizedException('Refresh token is invalid!');
    }
  }

  async validateEmail(email: string) {
    const staffInfo = await this.prisma.staff.findUnique({
      where: {
        email: email,
      },
      include: {
        role: {
          include: {
            role: {
              select: {
                roleName: true,
              },
            },
          },
        },
      },
    });
    return staffInfo;
  }

  async validateId(id: number) {
    const staffInfo = await this.prisma.staff.findUnique({
      where: {
        id: id,
        isDeleted: false,
      },
      include: {
        role: {
          include: {
            role: {
              select: {
                roleName: true,
              },
            },
          },
        },
      },
    });
    return staffInfo;
  }
}
