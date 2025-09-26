import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStaffDto } from './dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async createStaff(staffInput: CreateStaffDto) {
    console.log(staffInput);
    const data = {
      ...staffInput,
      password: await this.hashPassword(staffInput.password),
    };
    return data;
  }
  async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  }
}
