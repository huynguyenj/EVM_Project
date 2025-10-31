import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const VnpQueryQueries = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const {
      vnp_Version,
      vnp_Command,
      vnp_TmnCode,
      vnp_Locale,
      vnp_CurrCode,
      vnp_TxnRef,
      vnp_OrderInfo,
      vnp_OrderType,
      vnp_Amount,
      vnp_ReturnUrl,
      vnp_IpAddr,
      vnp_CreateDate,
      vnp_BankCode,
      vnp_ExpireDate,
      vnp_SecureHash,
      vnp_SecureHashType,
    } = request.query;
    return {
      vnp_Version,
      vnp_Command,
      vnp_TmnCode,
      vnp_Locale,
      vnp_CurrCode,
      vnp_TxnRef,
      vnp_OrderInfo,
      vnp_OrderType,
      vnp_Amount,
      vnp_ReturnUrl,
      vnp_IpAddr,
      vnp_CreateDate,
      vnp_BankCode,
      vnp_ExpireDate,
      vnp_SecureHash,
      vnp_SecureHashType,
    };
  },
);
