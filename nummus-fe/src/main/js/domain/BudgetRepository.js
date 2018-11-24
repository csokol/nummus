import moment from 'moment';
import MonthlyBudget from "./MonthlyBudget";
import CategoryBudget from "./CategoryBudget";

const nummusPrefix = "nummus.io";

class BudgetRepository {
  _categoryRepository;

  constructor(localStorage, categoryRepository) {
    this._localStorage = localStorage;
    this._categoryRepository = categoryRepository;
    this.currentMonthlyBudget();
  }

  list() {
    return this.categories;
  }

  currentMonthlyBudget() {
    const yearMonth = moment().format("YYYY_MM");
    const key = `${nummusPrefix}.monthlyBudgets.${yearMonth}`;
    const found = this._localStorage.getItem(key);

    if (found) {
      const budget = this._parseObject(found);
      budget.categoryBudgets = budget.categoryBudgets.map(obj => Object.assign(new CategoryBudget(), obj));
      return budget;
    }

    const categoryBudgets = this._categoryRepository.list()
      .map(CategoryBudget.fromCategory(yearMonth));

    const newBudget = new MonthlyBudget(key, categoryBudgets, yearMonth);

    this._localStorage.setItem(key, JSON.stringify(newBudget));
    return newBudget;
  }

  _parseObject(found) {
    return Object.assign(new MonthlyBudget(), JSON.parse(found));
  }

  update(monthlyBudget) {
    const key = `${nummusPrefix}.monthlyBudgets.${monthlyBudget.month}`;
    this._localStorage.setItem(key, JSON.stringify(monthlyBudget));
  }

  listMonths() {
    return Object.keys(this._localStorage)
      .filter(k => k.startsWith("nummus.io.monthlyBudgets"))
      .map(k => this._parseObject(this._localStorage.getItem(k)))
      .map(budget => budget.month).sort().reverse()
  }
}

export default BudgetRepository;














