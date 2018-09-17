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
}

export default Expense;
