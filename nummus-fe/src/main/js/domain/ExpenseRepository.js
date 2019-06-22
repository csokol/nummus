import Expense from "./Expense";
import UUIDGenerator from "./UUIDGenerator";

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
      .map(Expense.fromJsonObj)
      .sort((a, b) => -a.getDateMoment().diff(b.getDateMoment(), 'minutes'));
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

  amountsByCategory(yearMonth) {
    return this.list()
      .filter(expense => expense.sameMonth(yearMonth))
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

  findBy(yearMonth) {
    let yearMonthMoment = yearMonth.toMoment();
    return this.list()
      .filter(expense => {
        let expenseDate = expense.getDateMoment();
        return expenseDate.month() === yearMonthMoment.month() && expenseDate.year() === yearMonthMoment.year();
      });
  }

  userUuid() {
    let key = nummusPrefix + ".userUuid";
    let uuid = this.localStorage.getItem(key) || new UUIDGenerator().next();
    this.localStorage.setItem(key, uuid);

    return uuid;
  }

  setUserUuid(uuid) {
    let key = nummusPrefix + ".userUuid";
    this.localStorage.setItem(key, uuid);
  }

  apiKey() {
    let key = nummusPrefix + ".apiKey";
    return this.localStorage.getItem(key);
  }

  saveApiKey(apiKey) {
    let key = nummusPrefix + ".apiKey";
    this.localStorage.setItem(key, apiKey);
  }
}

export default ExpenseRepository;
