import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../main/js/App';
import ExpenseForm from '../../main/js/ExpenseForm';
import ExpenseHistory from '../../main/js/ExpenseHistory';
import ExpenseFormControl from './ExpenseForm.test';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactTestUtils from "react-dom/test-utils";
import TestRenderer from 'react-test-renderer'; // ES6


configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('adds expense into history', () => {
  const div = document.createElement('div');
  let app = ReactDOM.render(<App />, div);

  let formComponent = ReactTestUtils.findRenderedComponentWithType(app, ExpenseForm);
  let expenseForm = new ExpenseFormControl(formComponent);
  expenseForm.setAmount('100.0');
  expenseForm.setCategory('1');
  expenseForm.submit();

  expenseForm.setAmount('42.0');
  expenseForm.setCategory('2');
  expenseForm.submit();

  let historyComponent = ReactTestUtils.findRenderedComponentWithType(app, ExpenseHistory);

  let items = ReactTestUtils.scryRenderedDOMComponentsWithTag(historyComponent, 'tr');
  expect(items).toHaveLength(2);

  ReactDOM.unmountComponentAtNode(div);
});

