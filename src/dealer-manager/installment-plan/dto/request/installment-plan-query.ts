import { PaginationRequestQuery } from 'src/common/types';
import { InstallmentPlanStatus, InterestPaidType } from '../../types';

export class InstallmentPlanQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  interestPaidType?: InterestPaidType;
  status?: InstallmentPlanStatus;
}
