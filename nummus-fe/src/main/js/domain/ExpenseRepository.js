import Expense from "./Expense";
import UUIDGenerator from "./UUIDGenerator";
import AmountSpent from "./AmountSpent";
import NummusApi from "./NummusApi";
import moment from 'moment';

const nummusPrefix = "nummus.io";
const expenseKeysKey = nummusPrefix + ".expenseKeys";

const currentVersion = "v2";

class ExpenseRepository {
  localStorage;

  constructor(localStorage) {
    this.localStorage = localStorage;
    this.nummusApi = new NummusApi(this.userUuid());
    if (this.needsMigration()) {
      this.runV2Migration();
    }
  }

  needsMigration() {
    return this.localStorage.getItem(`${nummusPrefix}.version`) !== "v2";
  }

  list() {
    return this.listAll()
      .filter(e => e.deleted !== true);
  }

  listAll() {
    return this._getExpenseKeys()
      .map(this.localStorage.getItem.bind(this.localStorage))
      .map(JSON.parse)
      .filter(o => o != null)
      .map(Expense.fromJsonObj)
      .sort((a, b) => -a.getDateMoment().diff(b.getDateMoment(), 'minutes'));
  }

  _getExpenseKeys() {
    const arrayJson = this.localStorage.getItem(expenseKeysKey) || '[]';
    return JSON.parse(arrayJson);
  }

  addRawExpenses(expenses) {
    var expenseObjects = expenses.map(Expense.fromJsonObj);
    expenseObjects.forEach(this.add.bind(this))
  }

  add(expense) {
    let key = this.save(expense);
    this.nummusApi.save(expense)
      .then((expense) => {
        console.log("saved!")
        console.log(expense);
      });
    this.listExpensesSinceLastSync();

    let yearMonth = expense.getYearMonth();
    let items = this._readMonthIndex(yearMonth);

    items = items.filter(savedKey => savedKey !== expense.id);
    items.push(expense.id);
    this._setMonthIndex(yearMonth, items);

    let expenseKeys = this._getExpenseKeys();
    expenseKeys = expenseKeys.filter(savedKey => savedKey !== key);
    expenseKeys.push(key);
    this.localStorage.setItem(expenseKeysKey, JSON.stringify(expenseKeys));
  }

  listExpensesSinceLastSync() {
    let lastSync = this.localStorage.getItem(nummusPrefix + ".lastSyncV2");
    lastSync = lastSync ? moment(lastSync, "YYYYMMDDHH") : moment().subtract(1, 'years');
    this.nummusApi
      .list(lastSync)
      .then((response) => console.log(response))
      .then(() => this.localStorage.setItem(
        nummusPrefix + ".lastSyncV2",
        moment().format("YYYYMMDDHH")
      ));
  }

  save(expense) {
    let key = `${this.generateKey(expense)}`;
    let expenseJson = JSON.stringify(expense);

    this.localStorage.setItem(key, expenseJson);
    return key;
  }

  _readMonthIndex(yearMonth) {
    let index = this.localStorage.getItem(`v2.nummus.io.months-index.${yearMonth}`) || '[]';
    return JSON.parse(index);
  }

  generateKey(expense) {
    return this.generateKeyById(expense.id);
  }

  generateKeyById(id) {
    return `${nummusPrefix}.expenses.${id}`;
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
    return this.findBy(yearMonth)
      .reduce((map, expense) => {
        const currentAmount = map.get(expense.categoryId) ? map.get(expense.categoryId) : 0;
        map.set(expense.categoryId, currentAmount + expense.amountCents);
        return map;
      }, new Map());
  }

  dump() {
    return JSON.stringify(this.listAll());
  }

  deleteKeys(expenseIds) {
    let expenseKeys = this._getExpenseKeys();
    for (let index in expenseIds) {
      let key = `${nummusPrefix}.expenses.${expenseIds[index]}`;
      this.localStorage.removeItem(key);
      expenseKeys = expenseKeys.filter(savedKey => savedKey !== key);
    }
    this.localStorage.setItem(expenseKeysKey, JSON.stringify(expenseKeys));
  }

  addExpenses() {

  }

  loadDump(jsonString) {
    this._clearIndices();
    this.list().forEach(this.hardDelete.bind(this));
    JSON.parse(jsonString)
      .map(Expense.fromJsonObj)
      .forEach(this.add.bind(this));
  }

  findBy(yearMonth) {
    let ids = this._readMonthIndex(yearMonth.yearMonth);
    let repository = this;
    return ids.map(id => repository.localStorage.getItem(repository.generateKeyById(id)))
      .filter(e => e != null)
      .map(JSON.parse)
      .map(Expense.fromJsonObj)
      .filter(e => e.deleted !== true)
      .sort((a, b) => -a.getDateMoment().diff(b.getDateMoment(), 'minutes'));
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

  syncedV2() {
    this.localStorage.setItem(
      nummusPrefix + ".lastSyncV2",
      moment().format("YYYYMMDDHH")
    );
  }

  runV2Migration() {
    let expensesByMonth = this.listAll().reduce((acc, item) => {
      if (!acc[item.getYearMonth()]) {
        acc[item.getYearMonth()] = [];
      }
      acc[item.getYearMonth()].push(item.id);
      return acc;
    }, {});

    for (let [month, expenses] of Object.entries(expensesByMonth)) {
      this._setMonthIndex(month, expenses);
    }
    this.localStorage.setItem(`${nummusPrefix}.version`, "v2");
  }

  _setMonthIndex(month, expenseIds) {
    this.localStorage.setItem(ExpenseRepository._monthIndex(month), JSON.stringify(expenseIds));
  }

  static _monthIndex(month) {
    return `v2.nummus.io.months-index.${month}`;
  }

  _clearIndices() {
    let repository = this;
    new Set(this.list().map(e => e.getYearMonth()))
      .forEach(month => repository.localStorage.removeItem(ExpenseRepository._monthIndex(month)));
  }
}

export default ExpenseRepository;
