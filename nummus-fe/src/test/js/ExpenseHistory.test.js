// Link.react.test.js
import React from 'react';
import ExpenseForm from '../../main/js/ExpenseForm';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const amountSelector = 'input[type="number"]';

test('stores amount on state', () => {
  const nothing = function() {};
  const component = shallow(<ExpenseForm/>);

  const amount = component.find(amountSelector);
  amount.simulate('change', {target: {name: "amount", value: '100.50'}});

  expect(component.state()).toEqual({
    amount: '100.50',
  });
});

