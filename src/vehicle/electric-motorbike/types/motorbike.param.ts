import { PaginationRequestParams } from 'src/types';

export interface MotorbikeRequestParam extends PaginationRequestParams {
  page: number;
  limit: number;
  model: string | undefined;
  makeFrom: string | undefined;
}
