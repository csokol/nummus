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


it('shows spent amounts', () => {
  const div = document.createElement('div');
  const categoryRepository = new CategoryRepository();
  const localStorageMock = new LocalStorageMock();
  const budgetRepository = new BudgetRepository(localStorageMock, categoryRepository);
  const budget = budgetRepository.currentMonthlyBudget();
  budget.categoryBudgets[0].budgeted = 1000;
  budgetRepository.update(budget);

  const amountSpentByCategory = new Map();
  amountSpentByCategory.set(budget.categoryBudgets[0].categoryId, new AmountSpent(800));

  const testRenderer = TestRenderer.create(
    <BudgetDash
      categoryRepository={categoryRepository}
      amountSpentByCategory={amountSpentByCategory}
    />
  );
  const tableBodyRows = testRenderer.root.findByType('tbody').children[0];

  const spentFirstRow = tableBodyRows.children[0].children[1].props;
  expect(spentFirstRow.children).toEqual(["€", "08.00"]);
});
