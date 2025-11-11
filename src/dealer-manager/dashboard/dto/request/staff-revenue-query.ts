import { PaginationRequestQuery } from 'src/common/types';

export class StaffRevenueQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
}
