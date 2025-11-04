import { ApiResponseProperty } from '@nestjs/swagger';

class ChartQuarterData {
  @ApiResponseProperty({ example: 1 })
  month: number;
  @ApiResponseProperty({ example: 15000 })
  totalRevenue: number;
}

export class QuarterContractRevenueResponse {
  @ApiResponseProperty({ type: [ChartQuarterData] })
  quarterContractChartData: ChartQuarterData[];
}
