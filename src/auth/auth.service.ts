import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import authConfig from 'src/common/config/auth.config';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateNewPassword,
  ForgetPasswordDto,
  SignIn,
  VerificationCodeDto,
} from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt.payload';
import { EmailService } from 'src/email/email.service';
import { codeExpiredTime, generateCode } from './utils';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject(authConfig.KEY)
    private authSettings: ConfigType<typeof authConfig>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async signIn(signInDto: SignIn) {
    const staffInfo = await this.validateEmail(signInDto.email);
    if (staffInfo.isDeleted === true)
      throw new UnauthorizedException('This account is deleted!');
    if (staffInfo.isActive === false)
      throw new UnauthorizedException('This account is deactivated!');
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
      data: staffInfo,
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
    if (!staffInfo) throw new NotFoundException('This account is not existed!');
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

  async getProfile(staffId: number) {
    const data = await this.prisma.staff.findUnique({
      where: { id: staffId },
    });
    if (!data) throw new BadRequestException('Not found profile');
    return data;
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const { email, id } = await this.validateEmail(forgetPasswordDto.email);
    const verificationCode = generateCode();
    const expiredTime = codeExpiredTime();
    await this.emailService.sendVerifyCode(verificationCode, email);
    const verifiedCode = await this.prisma.verification_Code.findUnique({
      where: {
        staffId: id,
      },
    });
    if (!verifiedCode) {
      await this.prisma.verification_Code.create({
        data: {
          code: verificationCode,
          expiredAt: new Date(expiredTime),
          staffId: id,
        },
      });
    } else {
      await this.prisma.verification_Code.update({
        where: { id: verifiedCode.id },
        data: {
          code: verificationCode,
          expiredAt: new Date(expiredTime),
        },
      });
    }
    return;
  }

  async verificationCode(verificationCodeDto: VerificationCodeDto) {
    const { id } = await this.validateEmail(verificationCodeDto.email);
    const verificationCodeData = await this.prisma.verification_Code.findUnique(
      {
        where: { staffId: id },
      },
    );
    if (!verificationCodeData)
      throw new NotFoundException('Can not found verification code.');
    if (verificationCodeData.code !== verificationCodeDto.code)
      throw new BadRequestException('Your code is not correct.');
    if (verificationCodeData.code === null)
      throw new BadRequestException('Please do generate verify code first');
    if (verificationCodeData.expiredAt === null)
      throw new BadRequestException(
        'Please try to create a verify code process again',
      );
    const timeRemaining = verificationCodeData.expiredAt.getTime() - Date.now();
    if (timeRemaining <= 0) throw new BadRequestException('Code has expired');
    await this.prisma.verification_Code.update({
      where: { id: verificationCodeData.id },
      data: {
        isVerified: true,
      },
    });
  }

  async updatePassword(createPasswordDto: CreateNewPassword) {
    const { id } = await this.validateEmail(createPasswordDto.email);
    const isVerificationCodeExisted =
      await this.prisma.verification_Code.findUnique({
        where: { staffId: id },
      });
    if (!isVerificationCodeExisted || !isVerificationCodeExisted.isVerified)
      throw new BadRequestException('Please do generate verify code process');
    await this.prisma.staff.update({
      where: {
        email: createPasswordDto.email,
      },
      data: {
        password: await this.hashPassword(createPasswordDto.newPassword),
      },
    });
    await this.prisma.verification_Code.update({
      where: { id: isVerificationCodeExisted.id },
      data: {
        code: null,
        expiredAt: null,
        isVerified: false,
      },
    });
    return;
  }
}
