import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStaffDto } from './dto';
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
    return accountStaff;
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
    return accountStaff;
  }
}
