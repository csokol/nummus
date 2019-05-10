import moment from 'moment';
import MonthlyBudget from "./MonthlyBudget";
import CategoryBudget from "./CategoryBudget";

const nummusPrefix = "nummus.io";

class BudgetRepository {
  constructor(localStorage, categoryRepository, dateProvider = currentDateProvider) {
    this._localStorage = localStorage;
    this._categoryRepository = categoryRepository;
    this._dateProvider = dateProvider;
    this._initializeBudgets();
  }

  list() {
    return this.categories;
  }

  _now() {
    return this._dateProvider()
  }

  currentMonthlyBudget() {
    const yearMonth = this._now().format("YYYY_MM");
    return this._findOrCreate(yearMonth);
  }

  findMonth(yearMonth) {
    return this.listMonths().filter(m => m.yearMonth === yearMonth)[0];
  }

  _findOrCreate(yearMonth) {
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
      .map(budget => new BudgetRepository.YearMonth(budget.month, this._dateProvider))
      .sort((month1, month2) => -month1.toMoment().diff(month2.toMoment(), 'minutes'))
      .reverse()
  }

  currentMonth() {
    return this.listMonths().filter(m => m.is_current)[0];
  }

  _initializeBudgets() {
    this._findOrCreate(this._now().add(1, 'month').format("YYYY_MM"));
    this._findOrCreate(this._now().format("YYYY_MM"));
    this._findOrCreate(this._now().subtract(1, 'month').format("YYYY_MM"));
  }

  static YearMonth = class {
    constructor(yearMonth, dateProvider = currentDateProvider) {
      this.is_current = dateProvider().format("YYYY_MM") === yearMonth;
      this.yearMonth = yearMonth;
    }

    formatted() {
      return this.toMoment().format("MMM YY");
    }

    toMoment() {
      return moment(this.yearMonth, "YYYY_MM")
    }

  }
}

function currentDateProvider() {
  return moment();
}

export default BudgetRepository;














