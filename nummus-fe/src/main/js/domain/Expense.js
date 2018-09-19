import moment from 'moment';

const decimalSeparator = (1.1).toLocaleString().substring(1, 2);

class Expense {
  constructor(id, amountCents, categoryId) {
    this.id = id;
    this.amountCents = amountCents;
    this.categoryId = categoryId;
    const now = moment();
    this.date = {
      day: now.day(),
      month: now.month(),
      year: now.year(),
    }
  }

  static createFromState(id, state) {
    let categoryId = state.category.id;

    return new Expense(id, state.amount, categoryId);
  }

  amountAsString() {
    let cents = this.amountCents % 10;
    let units = this.amountCents / 10;
    return `${units}${decimalSeparator}${cents}`;
  }

  formattedDate() {
    if (!this.date) {
      return '-'
    }
    const fmtDate = `${this.date.day}-${this.date.month}-${this.date.year}`;
    return moment(fmtDate, "DD-MM-YYYY").format("DD-MM-YYYY");
  }

  static fromJsonObj(obj) {
    const expense = new Expense(obj.id, obj.amountCents, obj.categoryId);
    expense.date = obj.date;
    return expense;
  }
}

export default Expense;
