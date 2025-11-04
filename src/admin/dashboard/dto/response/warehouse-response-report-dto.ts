import { ApiResponseProperty } from '@nestjs/swagger';

export class TotalWarehouseReportResponse {
  @ApiResponseProperty({ example: 20 })
  totalWarehouses: number;
}
