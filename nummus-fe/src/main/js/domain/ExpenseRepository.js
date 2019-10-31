import Expense from "./Expense";
import UUIDGenerator from "./UUIDGenerator";
import AmountSpent from "./AmountSpent";
import moment from 'moment';

const nummusPrefix = "nummus.io";
const expenseKeysKey = nummusPrefix + ".expenseKeys";

class ExpenseRepository {
  localStorage;

  constructor(localStorage) {
    this.localStorage = localStorage;
  }

  list() {
    return this.listAll()
      .filter(e => e.deleted !== true);
  }

  listAll() {
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
    expense.deleted = true;
    this.localStorage.setItem(key, JSON.stringify(expense));
  }

  hardDelete(expense) {
    let key = `${nummusPrefix}.expenses.${expense.id}`;
    let expenseKeys = this._getExpenseKeys();
    this.localStorage.removeItem(key);
    expenseKeys = expenseKeys.filter(savedKey => savedKey !== key);
    this.localStorage.setItem(expenseKeysKey, JSON.stringify(expenseKeys));
  }

  amountsByCategory(yearMonth) {
    let previousMonthAmounts = this._amountsByCategory(yearMonth.previousMonth());
    return new Map(Array.from(this._amountsByCategory(yearMonth)).map(([id, amount]) => {
        return [id, new AmountSpent(amount, previousMonthAmounts.get(id))]
      }
    ));
  }

  _amountsByCategory(yearMonth) {
    return this.list()
      .filter(expense => expense.sameMonth(yearMonth))
      .reduce((map, expense) => {
        const currentAmount = map.get(expense.categoryId) ? map.get(expense.categoryId) : 0;
        map.set(expense.categoryId, currentAmount + expense.amountCents);
        return map;
      }, new Map());
  }

  dump() {
    return JSON.stringify(this.listAll());
  }

  loadDump(jsonString) {
    this.list().forEach(this.hardDelete.bind(this));
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

  shouldSync(now) {
    let lastSync = this.localStorage.getItem(nummusPrefix + ".lastSync");
    if (!lastSync) {
      return true;
    }
    let lastSyncMoment = moment(lastSync, "YYYYMMDDHH");

    let difference = lastSyncMoment.add(7, 'day')
      .diff(moment(), 'hours');

    return difference < 0;
  }

  synced() {
    this.localStorage.setItem(
      nummusPrefix + ".lastSync",
      moment().format("YYYYMMDDHH")
    );
  }
}

export default ExpenseRepository;
