import { ApiResponseProperty } from '@nestjs/swagger';

export class TotalCustomerResponse {
  @ApiResponseProperty({ example: 10 })
  totalCustomers: number;
}
