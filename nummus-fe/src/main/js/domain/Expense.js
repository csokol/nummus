import moment from 'moment';

const decimalSeparator = (1.1).toLocaleString().substring(1, 2);

class Expense {
  constructor(parameters, dateProvider = function() { return moment() }) {
    const {id, amountCents, categoryId} = parameters;
    this.id = id;
    this.amountCents = amountCents;
    this.categoryId = categoryId;
    const now = dateProvider();
    this.date = {
      day: now.date(),
      month: now.month() + 1,
      year: now.year(),
    }
  }

  static createFromState(id, state) {
    let categoryId = state.category.id;

    return new Expense({
      id: id,
      amountCents: state.amount,
      categoryId: categoryId
    });
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
    const expense = new Expense({
      id: obj.id,
      amountCents: obj.amountCents,
      categoryId: obj.categoryId
    });
    expense.date = obj.date;
    return expense;
  }

  getDateMoment() {
    const fmtDate = `${this.date.day}-${this.date.month}-${this.date.year}`;
    return moment(fmtDate, "DD-MM-YYYY");
  }
}

export default Expense;
