import {
  GenerateSchedulePaymentParameterType,
  InstallmentInterestStrategy,
} from '../types';

//Class calculate flat interest
export class FlatInterestStrategy implements InstallmentInterestStrategy {
  generateSchedulePayment({
    totalDebt,
    interestRate,
    rateMonths,
    totalMonths,
    startDate,
    contractId,
  }: GenerateSchedulePaymentParameterType) {
    const principal = totalDebt / totalMonths;
    const interestPerMonth = (totalDebt * (interestRate / 100)) / rateMonths;
    const totalEachMonth = principal + interestPerMonth;

    return Array.from({ length: totalMonths }, (_, i) => ({
      amountDue: totalEachMonth,
      amountPaid: 0,
      dueDate: this.addMonths(startDate, i + 1),
      installmentContractId: contractId,
      paidDate: null,
    }));
  }
  private addMonths(date: Date, months: number) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }
}
