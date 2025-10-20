import { PaginationRequestQuery } from 'src/common/types';

export class CustomerQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
}
