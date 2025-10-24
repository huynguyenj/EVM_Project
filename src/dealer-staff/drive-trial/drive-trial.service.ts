import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDriveTrailDto,
  DriveTrialQueries,
  UpdateDriveTrailDto,
} from './dto';
import { MotorbikeService } from 'src/vehicle/electric-motorbike/motorbike.service';
import { AgencyService } from 'src/admin/agency/agency.service';

@Injectable()
export class DriveTrialService {
  constructor(
    private prisma: PrismaService,
    private motorbikeService: MotorbikeService,
    private agencyService: AgencyService,
  ) {}

  async createDriveTrial(createBookingDriveTrial: CreateDriveTrailDto) {
    await this.agencyService.getAgencyDetail(createBookingDriveTrial.agencyId);
    await this.motorbikeService.getMotorbikeDetail(
      createBookingDriveTrial.motorbikeId,
    );

    const createdData = await this.prisma.drive_Trial.create({
      data: {
        driveDate: createBookingDriveTrial.driveDate,
        driveTime: createBookingDriveTrial.driveTime,
        email: createBookingDriveTrial.email,
        fullname: createBookingDriveTrial.fullname,
        phone: createBookingDriveTrial.phone,
        agencyId: createBookingDriveTrial.agencyId,
        electricMotorbikeId: createBookingDriveTrial.motorbikeId,
      },
    });
    return createdData;
  }

  async getDriveTrialList(
    agencyId: number,
    driveTrialQueries: DriveTrialQueries,
  ) {
    const skipData = (driveTrialQueries.page - 1) * driveTrialQueries.limit;
    const filters: object[] = [];

    if (driveTrialQueries.email) {
      filters.push({ email: { contains: driveTrialQueries.email } });
    }

    if (driveTrialQueries.fullname) {
      filters.push({ fullname: { contains: driveTrialQueries.fullname } });
    }

    if (driveTrialQueries.phone) {
      filters.push({ phone: driveTrialQueries.phone });
    }

    if (driveTrialQueries.status) {
      filters.push({ status: driveTrialQueries.status });
    }

    const listDriveTrial = await this.prisma.drive_Trial.findMany({
      skip: skipData,
      take: driveTrialQueries.limit,
      where: {
        AND: [{ agencyId: agencyId }, ...filters],
      },
    });

    return {
      data: listDriveTrial,
      paginationInfo: {
        page: driveTrialQueries.page,
        limit: driveTrialQueries.limit,
        total: await this.getTotalDriveTrialAgency(agencyId),
      },
    };
  }

  async getTotalDriveTrialAgency(agencyId: number) {
    return await this.prisma.drive_Trial.count({
      where: {
        agencyId: agencyId,
      },
    });
  }

  async getDriveTrialDetail(driveTrialId: number) {
    const data = await this.prisma.drive_Trial.findUnique({
      where: {
        id: driveTrialId,
      },
    });
    if (!data) throw new NotFoundException('Not found drive trial');
    return data;
  }

  async updateDriveTrial(
    driveTrialId: number,
    updateBookingDriveTrial: UpdateDriveTrailDto,
  ) {
    const updatedData = await this.prisma.drive_Trial.update({
      where: {
        id: driveTrialId,
      },
      data: updateBookingDriveTrial,
    });
    return updatedData;
  }

  async deleteDriveTrial(driveTrialId: number) {
    await this.prisma.drive_Trial.delete({
      where: {
        id: driveTrialId,
      },
    });
    return;
  }
}
