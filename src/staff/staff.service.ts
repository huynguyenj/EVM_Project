import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dto';
import { Prisma } from 'generated/prisma';
import { StaffQuery } from './types/staff-query';
@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async createStaff(staffInput: CreateAccountDto) {
    const staffInformationCreated = await this.prisma.staff.create({
      data: {
        email: staffInput.email,
        password: staffInput.password,
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
    return staffInformationCreated;
  }

  async updateStaffInfo(staffId: number, staffInfo: Prisma.StaffUpdateInput) {
    const staffData = await this.prisma.staff.update({
      where: {
        id: staffId,
      },
      data: staffInfo,
    });
    return staffData;
  }

  async getStaffByEmail(staffEmail: string) {
    const accountStaff = await this.prisma.staff.findUnique({
      where: { email: staffEmail, isDeleted: false },
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
    if (!accountStaff) return null;
    return {
      ...accountStaff,
      roleNames: accountStaff.role.map((r) => r.role.roleName),
    };
  }

  async getStaffById(staffId: number) {
    const accountStaff = await this.prisma.staff.findUnique({
      where: { id: staffId, isDeleted: false },
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
    if (!accountStaff) return null;
    return {
      ...accountStaff,
      roleNames: accountStaff.role.map((r) => r.role.roleName),
    };
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

  async getAllStaffAgency(staffQuery: StaffQuery) {
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
      where: {
        role: {
          some: {
            role: {
              OR: [
                { roleName: { contains: 'Dealer staff', mode: 'insensitive' } },
                {
                  roleName: { contains: 'Dealer manager', mode: 'insensitive' },
                },
              ],
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
        total: await this.getTotalStaffAgency(),
      },
    };
  }

  async getTotalStaffAdmin() {
    return await this.prisma.staff.count();
  }

  async getTotalStaffAgency() {
    return await this.prisma.staff.count({
      where: {
        role: {
          some: {
            role: {
              OR: [
                { roleName: { contains: 'Dealer Staff', mode: 'insensitive' } },
                {
                  roleName: { contains: 'Dealer manager', mode: 'insensitive' },
                },
              ],
            },
          },
        },
      },
    });
  }

  async deleteStaff(staffId: number) {
    await this.prisma.staff.update({
      where: { id: staffId },
      data: { isDeleted: true },
    });
  }
}
