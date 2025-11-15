import { PaginationRequestQuery } from 'src/common/types';

export class WarehouseQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  location: string;
  address: string;
  sort: string;
}
