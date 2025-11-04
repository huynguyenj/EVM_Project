import { ApiResponseProperty } from '@nestjs/swagger';

export class TotalMotorbikeReportResponse {
  @ApiResponseProperty({ example: 100 })
  totalMotorbikes: number;
}

export class ListTopMotorbikeOrderReport {
  @ApiResponseProperty({ example: 20 })
  totalQuantity: number;
  @ApiResponseProperty({ example: 'EV elec' })
  name: string;
}
