import { PaginationRequestQuery } from 'src/common/types';
import { OrderStatus } from 'src/dealer-manager/order-restock/types';

export class OrderManageQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  status?: OrderStatus;
  agencyId?: number;
  sort: string;
}
