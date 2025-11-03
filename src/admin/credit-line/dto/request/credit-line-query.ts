import { PaginationRequestQuery } from 'src/common/types';

export class CreditLineQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
}
