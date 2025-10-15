import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import authConfig from 'src/common/config/auth.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { Prisma } from 'generated/prisma';
import { StaffQuery } from './types';

@Injectable()
export class StaffService {
  constructor(
    private prisma: PrismaService,
    @Inject(authConfig.KEY)
    private authSettings: ConfigType<typeof authConfig>,
  ) {}

  async createStaff(staffInput: CreateAccountDto) {
    const staffExisted = await this.prisma.staff.findUnique({
      where: { email: staffInput.email, isDeleted: false },
    });
    if (staffExisted) {
      throw new BadRequestException('This email is already existed!');
    }
    const staffInformationCreated = await this.prisma.staff.create({
      data: {
        email: staffInput.email,
        password: await this.hashPassword(staffInput.password),
        username: staffInput.username,
        address: staffInput.address,
        fullname: staffInput.fullname,
        phone: staffInput.phone,
        role: {
          create: staffInput.role?.map((roleId) => ({
            roleId: roleId,
          })),
        },
      },
    });
    const responseData = await this.getStaffByIdAdmin(
      staffInformationCreated.id,
    );
    return responseData;
  }

  async hashPassword(password: string) {
    const hashPassword = await bcrypt.hash(
      password,
      this.authSettings.hashSalt,
    );
    return hashPassword;
  }

  async getStaffByIdAdmin(staffId: number) {
    const staffInfo = await this.prisma.staff.findUnique({
      where: {
        id: staffId,
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        phone: true,
        address: true,
        email: true,
        isActive: true,
        isDeleted: true,
        avatar: true,
        createAt: true,
        agencyId: true,
        role: {
          select: {
            role: {
              select: {
                roleName: true,
              },
            },
          },
        },
      },
    });
    if (!staffInfo) throw new BadRequestException('Can not find staff');
    return staffInfo;
  }

  async updateStaffInfoAdmin(
    staffId: number,
    staffInfo: Prisma.StaffUpdateInput,
  ) {
    const staffData = await this.prisma.staff.update({
      where: {
        id: staffId,
      },
      data: staffInfo,
    });
    return staffData;
  }

  async getAllStaffAdmin(staffQuery: StaffQuery) {
    const skipData = (staffQuery.page - 1) * staffQuery.limit;
    const staffList = await this.prisma.staff.findMany({
      skip: skipData,
      take: staffQuery.limit,
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
      where: staffQuery.role
        ? {
            role: {
              some: {
                role: {
                  roleName: {
                    contains: staffQuery.role,
                    mode: 'insensitive',
                  },
                },
              },
            },
          }
        : {},
    });
    return {
      staffList: staffList.map((staff) => {
        return {
          ...staff,
          role: undefined,
          password: undefined,
          roleNames: staff.role.map((r) => r.role.roleName),
        };
      }),
      paginationInfo: {
        page: staffQuery.page,
        limit: staffQuery.limit,
        total: await this.getTotalStaffAdmin(),
      },
    };
  }

  async getTotalStaffAdmin() {
    return await this.prisma.staff.count();
  }

  async deleteStaffAdmin(staffId: number) {
    await this.prisma.staff.update({
      where: { id: staffId },
      data: { isDeleted: true },
    });
  }
}
