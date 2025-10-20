type InstallmentPaymentType = {
  amountDue: number;
  amountPaid: number;
  dueDate: Date;
  installmentContractId: number;
  paidDate: Date | null;
};
export interface InstallmentInterestStrategy {
  generateSchedulePayment(params: {
    totalDebt: number;
    interestRate: number;
    rateMonths: number;
    totalMonths: number;
    startDate: Date;
    contractId: number;
  }): Array<InstallmentPaymentType>;
}

export type GenerateSchedulePaymentParameterType = Parameters<
  InstallmentInterestStrategy['generateSchedulePayment']
>[0];
