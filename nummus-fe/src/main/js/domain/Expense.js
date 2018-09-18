class Expense {
  constructor(id, amountCents, categoryId) {
    this.id = id;
    this.amountCents = amountCents;
    this.categoryId = categoryId;
  }

  static createFromState(id, state) {
    let categoryId = state.category.id;

    return new Expense(id, state.amount, categoryId);
  }

  amountAsString() {
    let cents = this.amountCents % 10;
    let units = this.amountCents / 10;
    return `${units}.${cents}`;
  }
}

export default Expense;
