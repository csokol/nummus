// Link.react.test.js
import React from 'react';

import ReactDOM from 'react-dom';
import BudgetInput from "../../../../main/js/application/components/BudgetInput";
import CategoryBudget from "../../../../main/js/domain/CategoryBudget";
import {AmountInputControl} from "./AmountInput.test";

it('shows budget', () => {
  const div = document.createElement('div');
  const categoryBudget = new CategoryBudget('1', 100, 1);
  const component = ReactDOM.render(<BudgetInput categoryBudget={categoryBudget} />, div);

  const amountValue = component._amountInput.state.value;
  expect(amountValue).toEqual(100);
});

it('updates budget with input', () => {
  const div = document.createElement('div');
  const categoryBudget = new CategoryBudget('1', 100, 1);
  const component = ReactDOM.render(<BudgetInput categoryBudget={categoryBudget} />, div);
  const amountControl = new AmountInputControl(component._amountInput);

  amountControl.backspace();
  amountControl.backspace();
  amountControl.backspace();
  amountControl.setAmount('200');

  const amountValue = component._amountInput.state.value;
  expect(amountValue).toEqual(200);
  expect(categoryBudget.budgeted).toEqual(200);
});
