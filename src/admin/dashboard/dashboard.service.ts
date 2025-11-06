import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ApBatchesQueries,
  QuarterRevenueContractAgencyQuery,
  TotalContractRevenueAgencyQuery,
} from './dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getTotalContractRevenueOfAgencyReport(
    revenueAgencyQuery: TotalContractRevenueAgencyQuery,
  ) {
    const filters: object[] = [];
    if (revenueAgencyQuery.agencyId) {
      filters.push({ agencyId: Number(revenueAgencyQuery.agencyId) });
    }
    const totalContract = await this.prisma.customer_Contract.findMany({
      where: {
        AND: [{ status: 'COMPLETED' }, ...filters],
      },
    });
    const revenue = totalContract.reduce((total, contract) => {
      return total + contract.finalPrice;
    }, 0);
    return {
      totalContractRevenue: revenue,
    };
  }

  async getRevenueContractOfAgencyByQuarterReport(
    revenueAgencyQuarter: QuarterRevenueContractAgencyQuery,
  ) {
    let startMonth: number = 0;
    let endMonth: number = 0;

    if (
      Number(revenueAgencyQuarter.quarter) > 4 ||
      Number(revenueAgencyQuarter.quarter) < 0
    )
      throw new BadRequestException('Quarter must in range 1 - 4');
    // Quarter 1
    if (Number(revenueAgencyQuarter.quarter) === 1) {
      startMonth = 1;
      endMonth = 3;
    }
    // Quarter 2
    if (Number(revenueAgencyQuarter.quarter) === 2) {
      startMonth = 4;
      endMonth = 6;
    }
    // Quarter 3
    if (Number(revenueAgencyQuarter.quarter) === 3) {
      startMonth = 7;
      endMonth = 9;
    }
    // Quarter 4
    if (Number(revenueAgencyQuarter.quarter) === 4) {
      startMonth = 10;
      endMonth = 12;
    }

    const customerContract = await this.prisma.$queryRaw<
      { finalPrice: number; signDate: Date }[]
    >`
      select cc."finalPrice", cc."signDate" 
      from customer_contracts cc
      where 
        extract(year from cc."signDate") >= ${startMonth}
        and extract(month from cc."signDate") <= ${endMonth}
        and cc."status" = 'COMPLETED'
        and cc."agencyId" = ${Number(revenueAgencyQuarter.agencyId)}
    `;

    const chartFormData: { month: number; totalRevenue: number }[] = []; // data: { month: 1, totalRevenue: 150000 }
    //Loop in a quarter
    for (let month = startMonth; month <= endMonth; month++) {
      // filter data by month of quarter
      const filterMonthData = customerContract.filter(
        (contract) => contract.signDate.getMonth() + 1 === month,
      );
      // calculate total revenue of the month in quarter
      const totalRevenue = filterMonthData.reduce((total, contract) => {
        return total + contract.finalPrice;
      }, 0);
      chartFormData.push({
        month: month,
        totalRevenue: totalRevenue,
      });
    }
    return {
      quarterContractChartData: chartFormData,
    };
  }

  async getApBatchesReport(apBatchesQueries: ApBatchesQueries) {
    const filters: object[] = [];
    if (apBatchesQueries.agencyId) {
      filters.push({ agencyId: Number(apBatchesQueries.agencyId) });
    }
    const apBatchesData = await this.prisma.ap_Batches.findMany({
      where: filters.length > 0 ? { AND: filters } : {},
    });
    const totalApBatches = apBatchesData.reduce((total, apBatch) => {
      return total + apBatch.amount;
    }, 0);
    return {
      totalApBatches,
    };
  }

  async getTotalAgencyReport() {
    const totalAgencies = await this.prisma.agency.count();
    return {
      totalAgencies,
    };
  }

  async getTotalMotorbikeReport() {
    const totalMotorbikes = await this.prisma.electric_Motorbike.count();
    return {
      totalMotorbikes,
    };
  }

  async getTotalWarehousesReport() {
    return await this.prisma.warehouse.count();
  }

  async getTop10MotorbikeOrderReport() {
    const listTop10 = await this.prisma.$queryRaw<
      { total_quantity: number; name: string }[]
    >`
      select sum(quantity)::numeric as total_quantity, em.name
      from order_items oi
      left join electric_motorbikes em on oi."electricMotorbikeId" = em.id 
      group by "electricMotorbikeId", em.name
      order by total_quantity desc
      limit 10
    `;
    return listTop10.map((top) => {
      return {
        ...top,
        total_quantity: Number(top.total_quantity),
      };
    });
  }
}
