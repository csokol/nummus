class BudgetRepository {

  constructor(localStorage) {
    this._localStorage = localStorage;
  }

  list() {
    return this.categories;
  }
}

export default BudgetRepository;
