// Link.react.test.js
import React from 'react';
import ExpenseForm from '../../main/js/ExpenseForm';

import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

const categories = [
  { name: 'fun money', id: 1 },
  { name: 'groceries', id: 2 },
];

it('stores amount on state', () => {
  const div = document.createElement('div');
  const component = ReactDOM.render(<ExpenseForm/>, div);

  const formControl = new ExpenseFormControl(component);
  formControl.setAmount('100.50');

  expect(component.state).toEqual({
    amount: '100.50',
    errors: [],
  });
  ReactDOM.unmountComponentAtNode(div);
});

it('stores category on state', () => {
  const div = document.createElement('div');
  const component = ReactDOM.render(
      <ExpenseForm
          categories={categories}
      />, div);

  const formControl = new ExpenseFormControl(component);
  formControl.setCategory('1');

  expect(component.state).toEqual({
    category: { name: 'fun money', id: 1 },
    errors: [],
  });
  ReactDOM.unmountComponentAtNode(div);
});

it('runs callback on submit', () => {
  let finalState = null;
  const div = document.createElement('div');
  const component = ReactDOM.render(
      <ExpenseForm
          categories={categories}
          onSubmit={(e, state) => finalState = state}
      />, div);

  const formControl = new ExpenseFormControl(component);

  formControl.setCategory('1');
  formControl.setAmount('100.50');

  formControl.submit();


  expect(finalState).toEqual({
    category: { name: 'fun money', id: 1 },
    amount: '100.50',
    errors: [],
  });

  ReactDOM.unmountComponentAtNode(div);
});

it('runs callback on click', () => {
  let finalState = null;
  const div = document.createElement('div');
  const component = ReactDOM.render(
      <ExpenseForm
          categories={categories}
          onSubmit={(e, state) => finalState = state}
      />, div);

  const formControl = new ExpenseFormControl(component);

  formControl.setCategory('1');
  formControl.setAmount('100.50');

  formControl.clickSubmit();

  expect(finalState).toEqual({
    category: { name: 'fun money', id: 1 },
    amount: '100.50',
    errors: [],
  });

  ReactDOM.unmountComponentAtNode(div);
});

it('validates category', () => {
  const div = document.createElement('div');
  let captured = null;
  const component = ReactDOM.render(
    <ExpenseForm
        onValidationError={(error) => captured = error}
    />, div);

  const formControl = new ExpenseFormControl(component);
  formControl.setAmount('100.50');
  formControl.submit();

  expect(captured).toEqual(
      [{"type": "empty_field", "where": "category"}]
  );
});

it('validates amount', () => {
  const div = document.createElement('div');
  let captured = null;
  const component = ReactDOM.render(
    <ExpenseForm
        onValidationError={(error) => captured = error}
        categories={categories}
    />, div);

  const formControl = new ExpenseFormControl(component);
  formControl.setCategory('1');
  formControl.submit();

  expect(captured).toEqual(
      [{"type": "empty_field", "where": "amount"}]
  );
});


class ExpenseFormControl {
  constructor(component) {
    this.component = component;
  }

  setCategory(categoryId) {
    this.component._category.value = categoryId;
    ReactTestUtils.Simulate.change(this.component._category);
  }

  setAmount(amount) {
    this.component._amount.value = amount;
    ReactTestUtils.Simulate.change(this.component._amount);
  }

  clickSubmit() {
    ReactTestUtils.Simulate.click(this.component._submit);
  }

  submit() {
    ReactTestUtils.Simulate.submit(this.component._submit);
  }
}

export default ExpenseFormControl;
