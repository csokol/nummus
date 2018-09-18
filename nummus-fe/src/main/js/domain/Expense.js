class Expense {
  amountCents;
  categoryId;

  constructor(amountCents, categoryId) {
    this.amountCents = amountCents;
    this.categoryId = categoryId;
  }

  static createFromState(state) {
    let categoryId = state.category.id;

    return new Expense(state.amount, categoryId);
  }

  amountAsString() {
    let cents = this.amountCents % 10;
    let units = this.amountCents / 10;
    return `${units}.${cents}`;
  }
}

export default Expense;
