class BudgetRepository {
  _categoryRepository;

  constructor(localStorage, categoryRepository) {
    this._localStorage = localStorage;
    this._categoryRepository = categoryRepository;
  }

  list() {
    return this.categories;
  }
}

export default BudgetRepository;
