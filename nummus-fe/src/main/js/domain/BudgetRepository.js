import moment from 'moment';
import MonthlyBudget from "./MonthlyBudget";
import CategoryBudget from "./CategoryBudget";

const nummusPrefix = "nummus.io";
const monthlyBudgetsKey = nummusPrefix + ".expenseKeys";

class BudgetRepository {
  _categoryRepository;

  constructor(localStorage, categoryRepository) {
    this._localStorage = localStorage;
    this._categoryRepository = categoryRepository;
  }

  list() {
    return this.categories;
  }

  currentMonthlyBudget() {
    const yearMonth = moment().format("YYYY_MM");
    const key = `${nummusPrefix}.monthlyBudgets.${yearMonth}`;
    const found = this._localStorage.getItem(key);

    if (found) {
      const budget = Object.assign(new MonthlyBudget, JSON.parse(found));
      budget.categoryBudgets = budget.categoryBudgets.map(obj => Object.assign(new CategoryBudget, obj))
      return budget;
    }

    const categoryBudgets = this._categoryRepository.list()
      .map(CategoryBudget.fromCategory(yearMonth));

    const newBudget = new MonthlyBudget(key, categoryBudgets, yearMonth);

    this._localStorage.setItem(key, JSON.stringify(newBudget));
    return newBudget;
  }

  update(monthlyBudget) {
    const key = `${nummusPrefix}.monthlyBudgets.${monthlyBudget.month}`;
    this._localStorage.setItem(key, JSON.stringify(monthlyBudget));
  }
}

export default BudgetRepository;
