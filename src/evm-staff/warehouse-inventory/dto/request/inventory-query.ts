import { PaginationRequestQuery } from 'src/common/types';

export class InventoryQuery implements PaginationRequestQuery {
  limit: number;
  page: number;
}
