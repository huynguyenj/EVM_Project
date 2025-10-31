export type VnpParam = {
  vnp_Version: string;
  vnp_Command: string;
  vnp_TmnCode: string;
  vnp_Locale: string;
  vnp_CurrCode: string;
  vnp_TxnRef: string | number;
  vnp_OrderInfo: string;
  vnp_OrderType: string;
  vnp_Amount: number;
  vnp_ReturnUrl: string;
  vnp_IpAddr: string;
  vnp_CreateDate: string;

  vnp_BankCode?: string;
  vnp_ExpireDate?: string;

  vnp_SecureHash?: string;
  vnp_SecureHashType?: 'SHA256' | 'SHA512';
};

export type VnpParamResponse = {
  vnp_TmnCode: string;
  vnp_Amount: number;
  vnp_BankCode?: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_PayDate: string;
  vnp_OrderInfo: string;
  vnp_TransactionNo: number;
  vnp_ResponseCode: string;
  vnp_TransactionStatus: number;
  vnp_TxnRef: string | number;
  vnp_SecureHash?: string;
};
