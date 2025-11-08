import {
  GenerateSchedulePaymentParameterType,
  InstallmentInterestStrategy,
} from '../types';

//Class calculate declining interest
export class DecliningInterestStrategy implements InstallmentInterestStrategy {
  generateSchedulePayment({
    totalDebt,
    interestRate,
    rateMonths,
    totalMonths,
    startDate,
    contractId,
  }: GenerateSchedulePaymentParameterType) {
    const monthlyAmount = totalDebt / totalMonths;
    const listAmount = Array.from({ length: totalMonths }, (_, i) => {
      const debtRemain = totalDebt - monthlyAmount * i;
      const interestThisMonth =
        (debtRemain * (interestRate / 100)) / rateMonths;
      const total = monthlyAmount + interestThisMonth;
      return {
        amountDue: Math.round(total),
        amountPaid: 0,
        period: this.addMonths(startDate, i + 1),
        installmentContractId: contractId,
        paidDate: null,
      };
    });
    return listAmount;
  }
  private addMonths(date: Date, months: number) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setDate(1);
    return newDate;
  }
}
