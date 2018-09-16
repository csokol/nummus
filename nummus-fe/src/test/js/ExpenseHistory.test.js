// Link.react.test.js
import React from 'react';
import ExpenseHistory from '../../main/js/ExpenseHistory';

import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


test('shows expenses', () => {
  const categoriesById = new Map();
  categoriesById.set('1', { name: 'fun money', id: 1 });
  categoriesById.set('2', { name: 'groceries', id: 2 });
  const expenses = [
    {amount: 1000, categoryId: '1'},
    {amount: 2000, categoryId: '2'},
  ];

  const div = document.createElement('div');
  const component = ReactDOM.render(
      <ExpenseHistory
          categoriesById={categoriesById}
          expenses={expenses}
      />, div);

  let items = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'tr');
  expect(items).toHaveLength(2);
  ReactDOM.unmountComponentAtNode(div);
});

