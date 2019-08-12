import React from 'react';
import ReactDOM from 'react-dom';
import BudgetDash from '../../../../main/js/application/components/BudgetDash';
import CategoryRepository from "../../../../main/js/domain/CategoryRepository";
import TestRenderer from 'react-test-renderer';
import BudgetRepository from "../../../../main/js/domain/BudgetRepository";
import LocalStorageMock from "../LocalStorageMock";
import {AmountInputControl} from "./AmountInput.test";
import ReactTestUtils from "react-dom/test-utils";
import AmountSpent from "../../../../main/js/domain/AmountSpent";

it('renders without crashing', () => {
  const categoryRepository = new CategoryRepository();
  const localStorageMock = new LocalStorageMock();
  const budgetRepository = new BudgetRepository(localStorageMock, categoryRepository);
  const div = document.createElement('div');
  ReactDOM.render(
    <BudgetDash
      categoryRepository={categoryRepository}
      amountSpentByCategory={new Map()}
    />, div);
});

