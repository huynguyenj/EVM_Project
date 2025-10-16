import { PaginationRequestQuery } from 'src/common/types';

export class PriceQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
}
