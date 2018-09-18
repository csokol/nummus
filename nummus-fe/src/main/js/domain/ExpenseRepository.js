import Expense from "./Expense";

const nummusPrefix = "nummus.io";
const expenseKeysKey = nummusPrefix + ".expenseKeys";

class ExpenseRepository {
  localStorage;
  constructor(localStorage) {
    this.localStorage = localStorage;
  }

  list() {
    return this.getExpenseKeys()
      .map(this.localStorage.getItem.bind(this.localStorage))
      .map(JSON.parse)
      .map(obj => new Expense(obj.id, obj.amountCents, obj.categoryId));
  }

  getExpenseKeys() {
    const arrayJson = this.localStorage.getItem(expenseKeysKey) || '[]';
    return JSON.parse(arrayJson);
  }

  add(expense) {
    let key = `${nummusPrefix}.expenses.${expense.id}`;
    let expenseKeys = this.getExpenseKeys();
    this.localStorage.setItem(key, JSON.stringify(expense));
    expenseKeys.push(key);
    this.localStorage.setItem(expenseKeysKey, JSON.stringify(expenseKeys));
  }

  delete(expense) {
    let key = `${nummusPrefix}.expenses.${expense.id}`;
    let expenseKeys = this.getExpenseKeys();
    this.localStorage.removeItem(key);
    expenseKeys = expenseKeys.filter(savedKey => savedKey !== key);
    this.localStorage.setItem(expenseKeysKey, JSON.stringify(expenseKeys));
  }

}

export default ExpenseRepository;
