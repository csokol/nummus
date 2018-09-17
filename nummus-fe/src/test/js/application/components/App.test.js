import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../../../main/js/application/components/App';
import Expense from '../../../../main/js/domain/Expense';
import ExpenseForm from '../../../../main/js/application/components/ExpenseForm';
import ExpenseHistory from '../../../../main/js/application/components/ExpenseHistory';
import ExpenseFormControl from './ExpenseForm.test';
import ReactTestUtils from "react-dom/test-utils";

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
global.localStorage = localStorageMock;


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('adds expense into history', () => {
  const div = document.createElement('div');
  let app = ReactDOM.render(<App />, div);

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

  ReactDOM.unmountComponentAtNode(div);
});

it('stores expense in localstorage', () => {
  const div = document.createElement('div');
  let app = ReactDOM.render(<App />, div);

  let formComponent = ReactTestUtils.findRenderedComponentWithType(app, ExpenseForm);
  let expenseForm = new ExpenseFormControl(formComponent);
  expenseForm.setAmount('100.00');
  expenseForm.setCategory('1');
  expenseForm.submit();

  let keys = Array.from(localStorageMock.store.keys());
  expect(keys).toHaveLength(1);
  let item = localStorageMock.getItem(keys[0]);

  expect(item).toEqual(JSON.stringify(new Expense(10000, 1)));
  localStorageMock.clear();
});
