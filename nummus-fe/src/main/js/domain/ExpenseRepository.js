import Expense from "./Expense";

const nummusPrefix = "nummus.io";
const expenseKeysKey = nummusPrefix + ".expenseKeys";

class ExpenseRepository {
  localStorage;
  constructor(localStorage) {
    this.localStorage = localStorage;
  }

  list() {
    return this._getExpenseKeys()
      .map(this.localStorage.getItem.bind(this.localStorage))
      .map(JSON.parse)
      .map(Expense.fromJsonObj);
  }

  _getExpenseKeys() {
    const arrayJson = this.localStorage.getItem(expenseKeysKey) || '[]';
    return JSON.parse(arrayJson);
  }

  add(expense) {
    let key = `${nummusPrefix}.expenses.${expense.id}`;
    let expenseKeys = this._getExpenseKeys();
    this.localStorage.setItem(key, JSON.stringify(expense));
    expenseKeys.push(key);
    this.localStorage.setItem(expenseKeysKey, JSON.stringify(expenseKeys));
  }

  delete(expense) {
    let key = `${nummusPrefix}.expenses.${expense.id}`;
    let expenseKeys = this._getExpenseKeys();
    this.localStorage.removeItem(key);
    expenseKeys = expenseKeys.filter(savedKey => savedKey !== key);
    this.localStorage.setItem(expenseKeysKey, JSON.stringify(expenseKeys));
  }

  amountsByCategory() {
    return this.list()
      .reduce((map, expense) => {
        const currentAmount = map.get(expense.categoryId) || 0;
        map.set(expense.categoryId, currentAmount + expense.amountCents);
        return map;
      }, new Map());
  }

  dump() {
    return JSON.stringify(this.list());
  }

  loadDump(jsonString) {
    this.list().forEach(this.delete.bind(this));
    JSON.parse(jsonString)
      .map(Expense.fromJsonObj)
      .forEach(this.add.bind(this));
  }

}

export default ExpenseRepository;
