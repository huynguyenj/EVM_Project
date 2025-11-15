import { PaginationRequestQuery } from 'src/common/types';
export class MotorbikeRequestQuery implements PaginationRequestQuery {
  limit: number;
  page: number;
  model: string | undefined;
  makeFrom: string | undefined;
  sort: string;
}
