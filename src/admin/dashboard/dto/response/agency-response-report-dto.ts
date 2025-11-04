import { ApiResponseProperty } from '@nestjs/swagger';

export class TotalAgencyReportResponse {
  @ApiResponseProperty({ example: 10 })
  totalAgencies: number;
}
