import { PaginationRequestQuery } from 'src/common/types';
export class ManagerQuery implements PaginationRequestQuery {
  limit: number;
  page: number;
  sort: string;
}
