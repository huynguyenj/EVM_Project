import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}
  async createRole(role: string) {
    const roleDataCreated = await this.prisma.role.create({
      data: {
        roleName: role,
      },
    });
    return roleDataCreated;
  }
  async getAllRoles() {
    const roles = await this.prisma.role.findMany();
    return roles;
  }
  async getRoleByStaffId(staffId: number) {
    const roles = await this.prisma.role_Staff.findMany({
      where: {
        staffId: staffId,
      },
      include: {
        role: {
          select: { id: true, roleName: true },
        },
      },
    });
    return roles;
  }
}
