import React from 'react';
import ReactDOM from 'react-dom';
import BudgetDash from '../../../../main/js/application/components/BudgetDash';
import CategoryRepository from "../../../../main/js/domain/CategoryRepository";
import TestRenderer from 'react-test-renderer';
import BudgetRepository from "../../../../main/js/domain/BudgetRepository";
import LocalStorageMock from "../LocalStorageMock";

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
  expect(budgetedForFirstRow.children).toEqual(['€','10.22']);
});

