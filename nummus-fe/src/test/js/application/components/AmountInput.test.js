// Link.react.test.js
import React from 'react';
import ExpenseForm from '../../../../main/js/application/components/ExpenseForm';

import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import AmountInput
  from "../../../../main/js/application/components/AmountInput";
import ExpenseFormControl from "./ExpenseForm.test";

const categories = [
  { name: 'fun money', id: 1 },
  { name: 'groceries', id: 2 },
];

const unit = (x) => x;

it('stores amount on state', () => {
  const div = document.createElement('div');
  const component = ReactDOM.render(<AmountInput onDigit={unit} />, div);

  const formControl = new AmountInputControl(component);
  formControl.setAmount('100.50');

  expect(component.state).toEqual({
    value: 10050,
    formattedValue: "100.50"
  });

  ReactDOM.unmountComponentAtNode(div);
});

it('formats amount', () => {
  const div = document.createElement('div');
  const component = ReactDOM.render(<AmountInput onDigit={unit} />, div);

  const control = new AmountInputControl(component);

  control.pressInAmount('9'.charCodeAt(0));
  control.pressInAmount('9'.charCodeAt(0));
  control.pressInAmount('9'.charCodeAt(0));
  control.pressInAmount(8);
  control.pressInAmount(8);
  expect(component._amount.value).toEqual('00.09');
});



class AmountInputControl {
  constructor(component) {
    this.component = component;
  }

  setAmount(amount) {
    for (let i = 0; i < amount.length; i++) {
      this.pressInAmount(amount.charCodeAt(i));
    }
  }

  pressInAmount(charCode) {
    const key = charCode === 8 ? 'Backspace' : String.fromCharCode(charCode);
    ReactTestUtils.Simulate.keyDown(this.component._amount, {key: key, keyCode: charCode, which: charCode});
  }

  backspace(charCode) {
    this.pressInAmount(8);
  }
}

export { AmountInputControl }
