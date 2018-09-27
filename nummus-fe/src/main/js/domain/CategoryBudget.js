const decimalSeparator = (1.1).toLocaleString().substring(1, 2);

class CategoryBudget {
  constructor(id, budgeted, categoryId) {
    this.id = id;
    this.budgeted = budgeted;
    this.categoryId = categoryId;
  }

  static fromCategory(yearMonth) {
    return (category) =>
      new CategoryBudget(`${category.id}_${yearMonth}`, 0, category.id);
  }

  setBudget(budgeted) {
    this.budgeted = budgeted;
  }

  formatedBudgetedAmount() {
    let cents = this.budgeted % 100;
    let units = Math.floor(this.budgeted / 100);
    return `${units}${decimalSeparator}${cents}`;
  }
}

export default CategoryBudget;
