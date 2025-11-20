import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StaffRevenueQueries, TotalContractChartQueries } from './dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getTotalCustomer(agencyId: number) {
    const totalCustomers = await this.prisma.customer.count({
      where: { agencyId: agencyId },
    });
    return {
      totalCustomers,
    };
  }

  async getTotalContractStatusChart(
    agencyId: number,
    totalContractQueries: TotalContractChartQueries,
  ) {
    const totalContracts = await this.prisma.$queryRaw<
      { status: string; month: number }[]
    >`
      select status, extract(month from "signDate") as month
      from customer_contracts
      where extract(year from "signDate") = ${Number(totalContractQueries.year)}
      and "agencyId" = ${agencyId}
    `;
    const dataSet: {
      month: number;
      totalContractDelivered: number;
      totalContractCompleted: number;
      totalContractPending: number;
    }[] = Array.from({ length: 12 }, (_, index: number) => {
      const filterDataByMonth = totalContracts.filter(
        (data) => Number(data.month) === index + 1,
      );
      const totalPendingContract = filterDataByMonth.filter(
        (data) => data.status.toLowerCase() === 'pending',
      ).length;
      const totalCompletedContract = filterDataByMonth.filter(
        (data) => data.status.toLowerCase() === 'completed',
      ).length;
      const totalDeliveredContract = filterDataByMonth.filter(
        (data) => data.status.toLowerCase() === 'delivered',
      ).length;
      return {
        month: index + 1,
        totalContractCompleted: totalCompletedContract,
        totalContractDelivered: totalDeliveredContract,
        totalContractPending: totalPendingContract,
      };
    });
    return dataSet;
  }

  async getTotalRevenueAgency(agencyId: number) {
    const totalRevenueContractFull =
      await this.getRevenueWithContractFull(agencyId);
    const totalRevenueContractDebt =
      await this.getRevenueWithContractDebt(agencyId);
    return {
      totalRevenue:
        totalRevenueContractFull.totalRevenue +
        totalRevenueContractDebt.totalRevenue,
    };
  }

  async getRevenueWithContractFull(agencyId: number) {
    // Calculate revenue by customer contract while contract paid type is full
    const contracts = await this.prisma.$queryRaw<{ total_revenue: number }[]>`
      select sum("finalPrice") as total_revenue
      from customer_contracts
      where "contractPaidType" = 'FULL'
      and "agencyId" = ${agencyId}
    `;
    const depositPunish = await this.prisma.deposit.findMany({
      where: {
        status: 'PUNISH',
      },
      select: {
        depositAmount: true,
      },
    });
    const totalDepositAmount = depositPunish.reduce((total, deposit) => {
      return total + deposit.depositAmount;
    }, 0);
    return {
      totalRevenue: Number(contracts[0].total_revenue) + totalDepositAmount,
    };
  }

  async getRevenueWithContractDebt(agencyId: number) {
    // With contract have installment
    // Calculate revenue by installment schedule with paid amount
    const totalData = await this.prisma.$queryRaw<
      {
        total_amount_paid: number;
        total_amount_penalty: number;
      }[]
    >`
      select sum (isc."amountPaid") as total_amount_paid, sum (isc."penaltyAmount") as total_amount_penalty
      from installment_schedule isc
      join (
            select ic.id
            from installment_contracts ic
            left join 
                  (
                        select * 
                        from customer_contracts
                        where "contractPaidType" = 'DEBT'
                        and "agencyId" = ${agencyId}
                  ) as cc
      on ic."customerContractId" = cc.id 
      ) as ic
      on isc."installmentContractId" = ic.id 
    `;
    return {
      totalRevenue:
        Number(totalData[0].total_amount_paid) +
        Number(totalData[0].total_amount_penalty),
    };
  }

  async getListStaffRevenue(
    agencyId: number,
    staffRevenueQueries: StaffRevenueQueries,
  ) {
    const skipData = (staffRevenueQueries.page - 1) * staffRevenueQueries.limit;
    const listData = await this.prisma.$queryRaw<
      {
        id: number;
        username: string;
        email: string;
        total_contract_revenue: number;
      }[]
    >`
      select s.id, s.username, s.email, sum(cc."finalPrice") as total_contract_revenue
      from customer_contracts cc
      join (
          select id, email, username
          from staffs
          where "agencyId" = ${agencyId}
        ) as s
      on cc."staffId" = s.id
      where cc.status = 'COMPLETED'
      group by s.email, s.id, s.username
      order by total_contract_revenue desc
      offset ${skipData}
      limit ${staffRevenueQueries.limit}
    `;

    const totalList = await this.prisma.$queryRaw<{ count: number }[]>`
      select count (ls.id) 
      from (
        select s.id, s.username, s.email, sum(cc."finalPrice") as total_contract_revenue
        from customer_contracts cc
        join (
          select id, email, username
          from staffs
          where "agencyId" = ${agencyId}
        ) as s
          on cc."staffId" = s.id
          where cc.status = 'COMPLETED'
          group by s.email, s.id, s.username
        ) ls
    `;
    return {
      data: listData,
      paginationInfo: {
        page: staffRevenueQueries.page,
        limit: staffRevenueQueries.limit,
        total: Number(totalList[0].count),
      },
    };
  }
}
