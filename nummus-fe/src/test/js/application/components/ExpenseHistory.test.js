// Link.react.test.js
import React from 'react';
import ExpenseHistory from '../../../../main/js/application/components/ExpenseHistory';
import Expense from '../../../../main/js/domain/Expense';

import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import ExpenseRepository from "../../../../main/js/domain/ExpenseRepository";
import LocalStorageMock from "../LocalStorageMock";
import BudgetRepository from "../../../../main/js/domain/BudgetRepository";
import moment from 'moment';
const localStorageMock = new LocalStorageMock();
global.localStorage = localStorageMock;

test('shows expenses', () => {
  const expenseRepository = new ExpenseRepository(localStorageMock);
  expenseRepository.add(new Expense({id: 1, amountCents: 1000, categoryId: 1}));
  expenseRepository.add(new Expense({id: 2, amountCents: 2000, categoryId: 2}));
  const component = makeComponent(expenseRepository);

  let items = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'tr');
  expect(items).toHaveLength(2);
  const cell = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'td')[1];
  const domNode = ReactDOM.findDOMNode(cell);
  expect(domNode.innerHTML).toEqual('€10.00');
  localStorageMock.clear();
});

test('deletes expense', () => {
  const expenseRepository = new ExpenseRepository(localStorageMock);
  expenseRepository.add(new Expense({id: 1, amountCents: 1000, categoryId: 1}));
  expenseRepository.add(new Expense({id: 2, amountCents: 2000, categoryId: 2}));
  const component = makeComponent(expenseRepository);

  const deleteButton = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'delete-expense')[0];
  ReactTestUtils.Simulate.click(deleteButton);
  let items = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'tr');
  expect(items).toHaveLength(1);
  localStorageMock.clear();
});

function makeComponent(expenseRepository) {
  const categoriesById = new Map();
  categoriesById.set(1, {name: 'fun money', id: 1});
  categoriesById.set(2, {name: 'groceries', id: 2});

  const div = document.createElement('div');
  const component = ReactDOM.render(
    <ExpenseHistory
      categoriesById={categoriesById}
      expenseRepository={expenseRepository}
      selectedMonth={new BudgetRepository.YearMonth(moment().format("YYYY_MM"))}
      expenses={expenseRepository.list()}
    />, div);
  return component;
}

