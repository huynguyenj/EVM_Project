import { PaginationRequestQuery } from 'src/common/types';
import { OrderStatus } from '../../types';

export class OrderQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  status?: OrderStatus;
  sort: string;
}
