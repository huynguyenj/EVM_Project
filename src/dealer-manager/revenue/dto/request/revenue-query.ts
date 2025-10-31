import { PaginationRequestQuery } from 'src/common/types';

export class RevenueQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
}
