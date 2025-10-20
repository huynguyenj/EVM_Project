import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import authConfig from 'src/common/config/auth.config';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/auth/types/role.enum';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger();
  constructor(
    @Inject(authConfig.KEY) private authSettings: ConfigType<typeof authConfig>,
    private prisma: PrismaService,
  ) {}
  async onModuleInit() {
    await this.createRoleDefaults();
    await this.createAdminAccount();
  }
  private async createRoleDefaults() {
    const requiredRoles = [
      Role.ADMIN,
      Role.CUSTOMER,
      Role.DEALER_MANAGER,
      Role.DEALER_STAFF,
      Role.EVM_STAFF,
    ];
    for (const role of requiredRoles) {
      const isRoleExited = await this.prisma.role.findUnique({
        where: {
          roleName: role,
        },
      });
      if (!isRoleExited) {
        await this.prisma.role.create({
          data: {
            roleName: role,
          },
        });
        this.logger.log(`Create role: ${role}`);
      }
    }
  }
  private async createAdminAccount() {
    const hashPassword = await bcrypt.hash(
      this.authSettings.adminPassword ?? '123456789',
      this.authSettings.hashSalt,
    );

    const isAdminAccountExisted = await this.prisma.staff.findUnique({
      where: {
        email: this.authSettings.adminEmail,
      },
    });
    if (isAdminAccountExisted) {
      this.logger.warn('Admin account already created!');
      return;
    }
    const adminRole = await this.prisma.role.findUnique({
      where: {
        roleName: Role.ADMIN,
      },
    });
    if (!adminRole) {
      this.logger.warn('Role are not created!');
      return;
    }
    await this.prisma.staff.create({
      data: {
        email: this.authSettings.adminEmail ?? 'admin@gmail.com',
        password: hashPassword,
        username: this.authSettings.adminUsername ?? 'admin',
        role: {
          create: {
            roleId: adminRole.id,
          },
        },
      },
    });
    this.logger.log('Create admin account success!');
  }
}
