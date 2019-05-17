// Link.react.test.js
import React from 'react';
import ExpenseForm from '../../../../main/js/application/components/ExpenseForm';

import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

const categories = [
  { name: 'fun money', id: 1 },
  { name: 'groceries', id: 2 },
];

const unit = (x) => x;

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
  formControl.setComment('comment');

  formControl.submit();

  expect(finalState).toEqual({
    category: { name: 'fun money', id: 1 },
    amount: 10050,
    comment: 'comment'
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
    amount: 10050,
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

  let {category: {empty}} = component._validationMessages;
  expect(empty.className).toEqual('form-error is-visible');

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
  let {amount: {empty}} = component._validationMessages;
  expect(empty.className).toEqual('form-error is-visible');

  expect(captured).toEqual(
      [{"type": "empty_field", "where": "amount"}]
  );
});

it('removes error messages after fixing', () => {
  const div = document.createElement('div');
  const component = ReactDOM.render(
    <ExpenseForm
        onValidationError={unit}
        categories={categories}
    />, div);

  const formControl = new ExpenseFormControl(component);
  formControl.submit();

  formControl.setAmount('100.5');
  formControl.setCategory('1');
  let {amount, category} = component._validationMessages;
  expect(amount.empty.className).toEqual('form-error');
  expect(category.empty.className).toEqual('form-error');
});

it('clears form after submit', () => {
  const div = document.createElement('div');
  const component = ReactDOM.render(
    <ExpenseForm
      onValidationError={unit}
      onSubmit={unit}
      categories={categories}
    />, div);
  const formControl = new ExpenseFormControl(component);

  formControl.setAmount('100.5');
  formControl.setCategory('1');
  formControl.submit();

  expect(component.state).toEqual({amount: null, category: null});
  expect(component._category.value).toEqual('0');
  expect(component._amount.value).toEqual('00.00');
});

class ExpenseFormControl {
  constructor(component) {
    this.component = component;
  }

  setComment(comment) {
    this.component._comment.value = comment;
    ReactTestUtils.Simulate.change(this.component._comment);
  }

  setCategory(categoryId) {
    this.component._category.value = categoryId;
    ReactTestUtils.Simulate.change(this.component._category);
  }

  setAmount(amount) {
    for (let i = 0; i < amount.length; i++) {
      this.pressInAmount(amount.charCodeAt(i));
    }
  }

  pressInAmount(charCode) {
    const key = charCode === 8 ? 'Backspace' : String.fromCharCode(charCode);
    ReactTestUtils.Simulate.keyDown(this.component._amount._amount, {key: key, keyCode: charCode, which: charCode});
  }

  clickSubmit() {
    ReactTestUtils.Simulate.click(this.component._submit);
  }

  submit() {
    ReactTestUtils.Simulate.submit(this.component._submit);
  }
}

export default ExpenseFormControl;
