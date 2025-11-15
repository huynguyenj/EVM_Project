import { PaginationRequestQuery } from 'src/common/types';

export class AgencyStockQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  motorbikeId?: number;
  colorId?: number;
  sort: string;
}
