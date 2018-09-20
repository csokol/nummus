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
}

export default CategoryBudget;
