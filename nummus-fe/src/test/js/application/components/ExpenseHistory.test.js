// Link.react.test.js
import React from 'react';
import ExpenseHistory from '../../../../main/js/application/components/ExpenseHistory';
import Expense from '../../../../main/js/domain/Expense';

import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
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
global.localStorage = localStorageMock;

test('shows expenses', () => {
  const component = makeComponent();

  let items = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'tr');
  expect(items).toHaveLength(2);
  const cell = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'td')[0];
  const domNode = ReactDOM.findDOMNode(cell);
  expect(domNode.innerHTML).toEqual('10.00');
  localStorageMock.clear();
});

test('deletes expense', () => {
  const component = makeComponent();

  const deleteButton = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'delete-expense')[0];
  ReactTestUtils.Simulate.click(deleteButton);
  let items = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'tr');
  expect(items).toHaveLength(1);
  localStorageMock.clear();
});

function makeComponent() {
  const categoriesById = new Map();
  categoriesById.set(1, {name: 'fun money', id: 1});
  categoriesById.set(2, {name: 'groceries', id: 2});
  const expenseRepository = new ExpenseRepository(localStorageMock);
  expenseRepository.add(new Expense(1, 1000, 1));
  expenseRepository.add(new Expense(2, 2000, 2));

  const div = document.createElement('div');
  const component = ReactDOM.render(
    <ExpenseHistory
      categoriesById={categoriesById}
      expenseRepository={expenseRepository}
    />, div);
  return component;
}

