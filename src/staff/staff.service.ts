import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStaffDto } from './dto';
import { Prisma } from 'generated/prisma';
@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async createStaff(staffInput: CreateStaffDto) {
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
}
