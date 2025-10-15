import { PaginationRequestQuery } from 'src/common/types';

export class AgencyQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  location: string;
  address: string;
}
