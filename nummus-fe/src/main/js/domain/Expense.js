class Expense {
  amountCents;
  categoryId;

  constructor(amountCents, categoryId) {
    this.amountCents = amountCents;
    this.categoryId = categoryId;
  }

  static createFromState(state) {
    let amountInt = parseInt(state.amount.replace(/\./g, ''), 10);
    let categoryId = state.category.id;

    return new Expense(amountInt, categoryId);
  }

  amountAsString() {
    let cents = this.amountCents % 10;
    let units = this.amountCents / 10;
    return `${units}.${cents}`;
  }
}

export default Expense;
