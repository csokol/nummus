// Link.react.test.js
import Expense from '../../../../main/js/domain/Expense';
import ExpenseRepository from "../../../../main/js/domain/ExpenseRepository";

class LocalStorageMock {
  store = new Map();

  getItem(key) {
    return this.store.get(key);
  }
  setItem(k, v){
    this.store.set(k, v);
  }

  clear() {
    this.store = new Map();
  }

  removeItem(key) {
    this.store.delete(key);
  }
}

const localStorageMock = new LocalStorageMock();

test('stores expenses', () => {
  const localStorage = localStorageMock;
  const expenses = new ExpenseRepository(localStorage);
  const expense = new Expense(1, 100, 10);
  expense.date = {
    day: 1,
    month: 1,
    year: 2018,
  };
  expenses.add(expense);

  expect(expenses.list()).toHaveLength(1);
  expect(expenses.list()[0]).toEqual(expense);
  localStorage.clear();
});

test('stores expenses with no date', () => {
  const localStorage = localStorageMock;
  const expenses = new ExpenseRepository(localStorage);
  const expense = new Expense(1, 100, 10);
  expense.date = undefined;
  expenses.add(expense);

  expect(expenses.list()).toHaveLength(1);
  expect(expenses.list()[0]).toEqual(expense);
  localStorage.clear();
});



