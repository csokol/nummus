// Link.react.test.js
import React from 'react';
import ExpenseForm from '../../main/js/ExpenseForm';

import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

const categories = [
  { name: 'fun money', id: 1 },
  { name: 'groceries', id: 2 },
];

test('stores amount on state', () => {
  const div = document.createElement('div');
  const component = ReactDOM.render(<ExpenseForm/>, div);

  component._amount.value = '100.50';
  ReactTestUtils.Simulate.change(component._amount);

  expect(component.state).toEqual({
    amount: '100.50',
  });
  ReactDOM.unmountComponentAtNode(div);
});

test('stores category on state', () => {
  const div = document.createElement('div');
  const component = ReactDOM.render(
      <ExpenseForm
          categories={categories}
      />, div);

  component._category.value = '1';
  ReactTestUtils.Simulate.change(component._category);

  expect(component.state).toEqual({
    category: { name: 'fun money', id: 1 },
  });
  ReactDOM.unmountComponentAtNode(div);
});

test('runs callback on submit', () => {
  let finalState = null;
  const div = document.createElement('div');
  const component = ReactDOM.render(
      <ExpenseForm
          categories={categories}
          onSubmit={(e, state) => finalState = state}
      />, div);

  component._category.value = '1';
  ReactTestUtils.Simulate.change(component._category);
  component._amount.value = '100.50';
  ReactTestUtils.Simulate.change(component._amount);

  ReactTestUtils.Simulate.submit(component._submit);

  expect(finalState).toEqual({
    category: { name: 'fun money', id: 1 },
    amount: '100.50',
  });

  ReactDOM.unmountComponentAtNode(div);
});

test('runs callback on click', () => {
  let finalState = null;
  const div = document.createElement('div');
  const component = ReactDOM.render(
      <ExpenseForm
          categories={categories}
          onSubmit={(e, state) => finalState = state}
      />, div);

  component._category.value = '1';
  ReactTestUtils.Simulate.change(component._category);
  component._amount.value = '100.50';
  ReactTestUtils.Simulate.change(component._amount);

  ReactTestUtils.Simulate.click(component._submit);

  expect(finalState).toEqual({
    category: { name: 'fun money', id: 1 },
    amount: '100.50',
  });

  ReactDOM.unmountComponentAtNode(div);
});
