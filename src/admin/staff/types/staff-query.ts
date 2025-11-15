import { PaginationRequestQuery } from 'src/common/types';
export class StaffQuery implements PaginationRequestQuery {
  limit: number;
  page: number;
  role: string | undefined;
  sort: string;
}
