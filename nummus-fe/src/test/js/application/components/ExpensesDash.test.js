import React from 'react';
import ReactDOM from 'react-dom';
import ExpensesDash from '../../../../main/js/application/components/ExpensesDash';
import Expense from '../../../../main/js/domain/Expense';
import AutoIncrementIdGenerator from '../../../../main/js/domain/AutoIncrementIdGenerator';
import ExpenseForm from '../../../../main/js/application/components/ExpenseForm';
import ExpenseHistory from '../../../../main/js/application/components/ExpenseHistory';
import ExpenseFormControl from './ExpenseForm.test';
import ReactTestUtils from "react-dom/test-utils";
import CategoryRepository from "../../../../main/js/domain/CategoryRepository";
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
}

const localStorageMock = new LocalStorageMock();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExpensesDash categoryRepository={new CategoryRepository()}/>, div);
});

it('adds expense into history', () => {
  const div = document.createElement('div');
  let app = makeApp(div);

  let formComponent = ReactTestUtils.findRenderedComponentWithType(app, ExpenseForm);
  let expenseForm = new ExpenseFormControl(formComponent);
  expenseForm.setAmount('100.0');
  expenseForm.setCategory('1');
  expenseForm.submit();

  expenseForm.setAmount('42.0');
  expenseForm.setCategory('2');
  expenseForm.submit();

  let historyComponent = ReactTestUtils.findRenderedComponentWithType(app, ExpenseHistory);

  let items = ReactTestUtils.scryRenderedDOMComponentsWithTag(historyComponent, 'tr');
  expect(items).toHaveLength(2);
});

it('stores expense in localstorage', () => {
  const div = document.createElement('div');
  let app = makeApp(div);

  let formComponent = ReactTestUtils.findRenderedComponentWithType(app, ExpenseForm);
  let expenseForm = new ExpenseFormControl(formComponent);
  expenseForm.setAmount('100.00');
  expenseForm.setCategory('1');
  expenseForm.submit();
  expenseForm.setAmount('100.00');
  expenseForm.setCategory('1');
  expenseForm.submit();

  let keys = Array.from(localStorageMock.store.keys());
  expect(keys).toHaveLength(3);
  let item = localStorageMock.getItem('nummus.io.expenses.1');

  expect(item).toEqual(JSON.stringify(new Expense({
    id: 1,
    amountCents: 10000,
    categoryId: 1
  })));
  localStorageMock.clear();
});

it('puts localstorage data into history', () => {
  const nummusPrefix = "nummus.io.";
  const expenseKeysKey = nummusPrefix + "expenseKeys";

  const div = document.createElement('div');
  localStorageMock.setItem('nummus.io.expenses.1', JSON.stringify(new Expense({
    id: 1,
    amountCents: 10000,
    categoryId: 1
  })));
  localStorageMock.setItem('nummus.io.expenses.2', JSON.stringify(new Expense({
    id: 2,
    amountCents: 10000,
    categoryId: 1
  })));
  localStorageMock.setItem(expenseKeysKey, JSON.stringify(['nummus.io.expenses.1', 'nummus.io.expenses.2']));
  let app = makeApp(div);

  let historyComponent = ReactTestUtils.findRenderedComponentWithType(app, ExpenseHistory);

  let items = ReactTestUtils.scryRenderedDOMComponentsWithTag(historyComponent, 'tr');
  expect(items).toHaveLength(2);
});

function makeApp(div) {
  return ReactDOM.render(<ExpensesDash
    idGenerator={new AutoIncrementIdGenerator()}
    expenseRepository={new ExpenseRepository(localStorageMock)}
    categoryRepository={new CategoryRepository()}
  />, div);
}
