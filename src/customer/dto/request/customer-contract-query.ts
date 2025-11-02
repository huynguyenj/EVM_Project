import { PaginationRequestQuery } from 'src/common/types';

export class CustomerContractQueries implements PaginationRequestQuery {
  page: number;
  limit: number;
}
