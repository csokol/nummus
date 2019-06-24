import moment from "moment";

function currentDateProvider() {
  return moment();
}

class AmountSpent {
  constructor(amount, spentPreviousMonth = 0, dateProvider = currentDateProvider) {
    this._dateProvider = dateProvider;
    this.amount = amount;
    this.projected = this._calculateProjection();
    this.spentPreviousMonth = spentPreviousMonth;
    this.rate = this._calculateSpentRateVsPreviousMonth();
  }

  _calculateProjection() {
    const today = this._dateProvider().date();
    const endOfMonth = this._dateProvider().endOf('month').date();

    return Math.round((endOfMonth * this.amount) / today);
  }
  _calculateSpentRateVsPreviousMonth() {
    if (this.amount && this.spentPreviousMonth) {
      return Math.round((this.amount / this.spentPreviousMonth) * 100);
    }
    return undefined;
  }
}

export default AmountSpent;