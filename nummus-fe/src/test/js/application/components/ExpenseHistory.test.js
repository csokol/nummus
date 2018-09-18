// Link.react.test.js
import React from 'react';
import ExpenseHistory from '../../../../main/js/application/components/ExpenseHistory';
import Expense from '../../../../main/js/domain/Expense';

import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


test('shows expenses', () => {
  const categoriesById = new Map();
  categoriesById.set(1, { name: 'fun money', id: 1 });
  categoriesById.set(2, { name: 'groceries', id: 2 });
  const expenses = [
    new Expense(1000, 1),
    new Expense(2000, 2),
  ];

  const div = document.createElement('div');
  const component = ReactDOM.render(
      <ExpenseHistory
          categoriesById={categoriesById}
          expenses={expenses}
      />, div);

  let items = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'tr');
  expect(items).toHaveLength(2);
  const cell = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'td')[0];
  const domNode = ReactDOM.findDOMNode(cell);
  expect(domNode.innerHTML).toEqual('10,00');
});

