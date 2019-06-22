import moment from 'moment';

const decimalSeparator = (1.1).toLocaleString().substring(1, 2);

class Expense {
  constructor(parameters, dateProvider = function() { return moment() }) {
    const {id, amountCents, categoryId, comment} = parameters;
    this.id = id;
    this.amountCents = amountCents;
    this.categoryId = categoryId;
    this.comment = comment;
    const now = dateProvider();
    this.date = {
      day: now.date(),
      month: now.month() + 1,
      year: now.year(),
      hour: now.hour(),
      minute: now.minute(),
    }
  }

  static createFromState(id, state) {
    let categoryId = state.category.id;

    return new Expense({
      id: id,
      amountCents: state.amount,
      categoryId: categoryId,
      comment: state.comment
    });
  }

  amountAsString() {
    let cents = this.amountCents % 10;
    let units = this.amountCents / 10;
    return `${units}${decimalSeparator}${cents}`;
  }

  sameMonth(yearMonth) {
    return this.getDateMoment().format("YYYY_MM") === yearMonth.yearMonth;
  }

  formattedDate() {
    if (!this.date) {
      return '-'
    }
    return this.getDateMoment().format("DD-MM-YYYY HH:mm");
  }

  static fromJsonObj(obj) {
    const expense = new Expense({
      id: obj.id,
      amountCents: obj.amountCents,
      categoryId: obj.categoryId,
      comment: obj.comment
    });

    expense.date = obj.date;

    if (expense.date) {
      expense.date.hour = obj.date.hour || 12;
      expense.date.minute = obj.date.minute || 0;
    }
    return expense;
  }

  getDateMoment() {
    const fmtDate = `${this.date.day}-${this.date.month}-${this.date.year} ${this.date.hour}:${this.date.minute}`;
    return moment(fmtDate, "DD-MM-YYYY HH:mm");
  }
}

export default Expense;
