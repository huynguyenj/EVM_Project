import { ApiResponseProperty } from '@nestjs/swagger';

export class StaffContractRevenue {
  @ApiResponseProperty({ example: 1 })
  id: number;
  @ApiResponseProperty({ example: 'johnDoe' })
  username: string;
  @ApiResponseProperty({ example: 'johndoe@gmail.com' })
  email: string;
  @ApiResponseProperty({ example: 20000 })
  total_contract_revenue: number;
}
