import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import authConfig from 'src/common/config/auth.config';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateStaffDto } from './dto';
import { ManagerQuery } from './types';
import { Prisma } from 'generated/prisma';

@Injectable()
export class StaffService {
  constructor(
    private prisma: PrismaService,
    @Inject(authConfig.KEY)
    private authSettings: ConfigType<typeof authConfig>,
  ) {}
  async createStaff(staffInput: CreateStaffDto) {
    const staffExisted = await this.prisma.staff.findUnique({
      where: { email: staffInput.email, isDeleted: false },
    });
    if (staffExisted) {
      throw new BadRequestException('This email is already existed!');
    }
    const isUserNameExisted = await this.prisma.staff.findUnique({
      where: {
        username: staffInput.username,
        isDeleted: false,
      },
    });
    if (isUserNameExisted)
      throw new BadRequestException('This username already existed!');
    const staffInformationCreated = await this.prisma.staff.create({
      data: {
        email: staffInput.email,
        password: await this.hashPassword(staffInput.password),
        username: staffInput.username,
        address: staffInput.address,
        fullname: staffInput.fullname,
        phone: staffInput.phone,
        agencyId: staffInput.agencyId,
        role: {
          create: {
            roleId: staffInput.roleId,
          },
        },
      },
    });
    return staffInformationCreated;
  }

  async getRoleDealerStaff() {
    const role = await this.prisma.role.findFirst({
      select: {
        roleName: true,
        id: true,
      },
      where: {
        roleName: {
          contains: 'Dealer Staff',
          mode: 'insensitive',
        },
      },
    });
    if (!role) throw new NotFoundException('Not found dealer staff role');
    return role;
  }

  async hashPassword(password: string) {
    const hashPassword = await bcrypt.hash(
      password,
      this.authSettings.hashSalt,
    );
    return hashPassword;
  }

  async getAllStaffAgency(agencyId: number, staffQuery: ManagerQuery) {
    const skipData = (staffQuery.page - 1) * staffQuery.limit;
    const staffList = await this.prisma.staff.findMany({
      skip: skipData,
      take: staffQuery.limit,
      where: {
        agencyId: agencyId,
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
        total: await this.getTotalStaffAgency(agencyId),
      },
    };
  }

  async getTotalStaffAgency(agencyId: number) {
    return await this.prisma.staff.count({
      where: {
        agencyId: agencyId,
        isDeleted: false,
      },
    });
  }

  async updateStaffInfoAgency(
    staffId: number,
    staffInfo: Prisma.StaffUpdateInput,
  ) {
    const staffData = await this.prisma.staff.update({
      where: {
        id: staffId,
        role: {
          some: {
            NOT: [
              {
                role: {
                  roleName: { contains: 'Admin', mode: 'insensitive' },
                },
              },
              {
                role: {
                  roleName: { contains: 'Evm staff', mode: 'insensitive' },
                },
              },
            ],
          },
        },
      },
      data: staffInfo,
    });
    const responseData = {
      ...staffData,
      password: undefined,
    };
    return responseData;
  }

  async deleteStaffAgency(staffId: number) {
    await this.prisma.staff.update({
      where: {
        id: staffId,
        role: {
          some: {
            role: { roleName: { contains: 'Dealer', mode: 'insensitive' } },
          },
        },
      },
      data: { isDeleted: true, isActive: false },
    });
  }
}
