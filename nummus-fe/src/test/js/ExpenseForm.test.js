// Link.react.test.js
import React from 'react';
import ExpenseForm from '../../main/js/ExpenseForm';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

configure({ adapter: new Adapter() });

test('stores amount on state', () => {
  const component = shallow(<ExpenseForm/>);

  const amount = component.find(TextField);
  amount.simulate('change', {target: {name: "amount", value: '100.50'}});

  expect(component.state()).toEqual({
    amount: '100.50',
  });
});

test('stores category on state', () => {
  const categories = [
    { name: 'fun money', id: 1 },
    { name: 'groceries', id: 2 },
  ];
  const component = shallow(
      <ExpenseForm
          categories={categories}
      />);

  const category = component.find(Select);
  category.simulate('change', {target: {name: "category", value: '1'}});

  expect(component.state()).toEqual({
    category: { name: 'fun money', id: 1 },
  });
});

test('runs callback on submit', () => {
  let finalState = null;
  const categories = [
    { name: 'fun money', id: 1 },
    { name: 'groceries', id: 2 },
  ];
  const component = shallow(
      <ExpenseForm
          categories={categories}
          onSubmit={(e, state) => finalState = state}
      />);

  const category = component.find(Select);
  category.simulate('change', {target: {name: "category", value: '1'}});
  const amount = component.find(TextField);
  amount.simulate('change', {target: {name: "amount", value: '100.50'}});

  component.find(Button).simulate("submit");

  expect(finalState).toEqual({
    category: { name: 'fun money', id: 1 },
    amount: '100.50',
  });

});

test('runs callback on click', () => {
  let finalState = null;
  const categories = [
    { name: 'fun money', id: 1 },
    { name: 'groceries', id: 2 },
  ];
  const component = shallow(
      <ExpenseForm
          categories={categories}
          onSubmit={(e, state) => finalState = state}
      />);

  const category = component.find(Select);
  category.simulate('change', {target: {name: "category", value: '1'}});
  const amount = component.find(TextField);
  amount.simulate('change', {target: {name: "amount", value: '100.50'}});

  component.find(Button).simulate("click");

  expect(finalState).toEqual({
    category: { name: 'fun money', id: 1 },
    amount: '100.50',
  });

});
