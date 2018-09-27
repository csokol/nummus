import React from 'react';
import ReactDOM from 'react-dom';
import BudgetDash from '../../../../main/js/application/components/BudgetDash';
import CategoryRepository from "../../../../main/js/domain/CategoryRepository";
import TestRenderer from 'react-test-renderer';
import BudgetRepository from "../../../../main/js/domain/BudgetRepository";
import LocalStorageMock from "../LocalStorageMock";
import {AmountInputControl} from "./AmountInput.test";
import ReactTestUtils from "react-dom/test-utils";

it('renders without crashing', () => {
  const categoryRepository = new CategoryRepository();
  const localStorageMock = new LocalStorageMock();
  const budgetRepository = new BudgetRepository(localStorageMock, categoryRepository);
  const div = document.createElement('div');
  ReactDOM.render(
    <BudgetDash
      budgetRepository={budgetRepository}
      categoryRepository={categoryRepository}
    />, div);
});

it('shows categories with empty budgets', () => {
  const categoryRepository = new CategoryRepository();
  const localStorageMock = new LocalStorageMock();
  const budgetRepository = new BudgetRepository(localStorageMock, categoryRepository);

  const testRenderer = TestRenderer.create(
    <BudgetDash
      budgetRepository={budgetRepository}
      categoryRepository={categoryRepository}
    />
  );
  const tableBodyRows = testRenderer.root.findByType('tbody').children;

  expect(tableBodyRows).toHaveLength(categoryRepository.list().length);
});

it('shows existing bugdets', () => {
  const div = document.createElement('div');
  const categoryRepository = new CategoryRepository();
  const localStorageMock = new LocalStorageMock();
  const budgetRepository = new BudgetRepository(localStorageMock, categoryRepository);
  const budget = budgetRepository.currentMonthlyBudget();
  budget.categoryBudgets[0].budgeted = 1022;
  budgetRepository.update(budget);

  const testRenderer = TestRenderer.create(
    <BudgetDash
      budgetRepository={budgetRepository}
      categoryRepository={categoryRepository}
    />
  );
  const tableBodyRows = testRenderer.root.findByType('tbody').children;

  const budgetedForFirstRow = tableBodyRows[0].children[1].props;
  expect(tableBodyRows).toHaveLength(categoryRepository.list().length);
  expect(budgetedForFirstRow.children.props.categoryBudget.budgeted).toEqual(1022);
});

it('updates budget repository', () => {
  const div = document.createElement('div');
  const categoryRepository = new CategoryRepository();
  const localStorageMock = new LocalStorageMock();
  const budgetRepository = new BudgetRepository(localStorageMock, categoryRepository);

  const component = ReactDOM.render(
    <BudgetDash
      budgetRepository={budgetRepository}
      categoryRepository={categoryRepository}
    />, div);
  const budgetInput = component._budgetInputs[0];
  const input = new AmountInputControl(budgetInput._amountInput);
  input.setAmount('3020');

  const tbody = ReactTestUtils.findRenderedDOMComponentWithTag(component, "tbody");
  const budgetedForFirstRow = tbody.children[0].cells[1].children[0].value;
  expect(budgetedForFirstRow).toEqual('30.20');

  const updatedBudget = budgetRepository.currentMonthlyBudget().categoryBudgets[0];
  expect(updatedBudget.budgeted).toEqual(3020);
});
