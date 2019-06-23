// Link.react.test.js
import Expense from '../../../../main/js/domain/Expense';
import ExpenseRepository from "../../../../main/js/domain/ExpenseRepository";
import LocalStorageMock from "../LocalStorageMock";
import BudgetRepository from "../../../../main/js/domain/BudgetRepository";
import CategoryRepository from "../../../../main/js/domain/CategoryRepository";
import moment from "moment";

const localStorageMock = new LocalStorageMock();

test('creates budget for current month for each category', () => {
  const storage = new LocalStorageMock();
  const categoryRepository = new CategoryRepository();
  const budgetRepository = new BudgetRepository(storage, categoryRepository);

  const monthlyBudget = budgetRepository.currentMonthlyBudget();
  expect(monthlyBudget.categoryBudgets).toHaveLength(categoryRepository.list().length);
});

test('creates budget only on the first time', () => {
  const storage = new LocalStorageMock();
  let setItemCalls = 0;
  const categoryRepository = new CategoryRepository();

  storage.setItemOrig = storage.setItem;
  storage.setItem = (k, v) => {
    setItemCalls++;
    storage.setItemOrig(k, v);
  };
  const budgetRepository1 = new BudgetRepository(storage, categoryRepository);
  const budgetRepository2 = new BudgetRepository(storage, categoryRepository);

  const monthlyBudget1 = budgetRepository1.currentMonthlyBudget();
  const monthlyBudget2 = budgetRepository2.currentMonthlyBudget();

  expect(monthlyBudget1.categoryBudgets).toHaveLength(categoryRepository.list().length);
  expect(monthlyBudget2).toEqual(monthlyBudget1);
});

test('creates three months window budgets', () => {
  const storage = new LocalStorageMock();
  let setItemCalls = 0;
  const categoryRepository = new CategoryRepository();

  function fixedDateProvider() {
    return moment("01-10-2018", "DD-MM-YYYY");
  }

  const budgetRepository = new BudgetRepository(storage, categoryRepository, fixedDateProvider);

  const months = budgetRepository.listMonths();

  expect(months).toHaveLength(3);

  expect(months[0].yearMonth).toEqual("2018_09");
  expect(months[0].is_current).toEqual(false);

  expect(months[1].yearMonth).toEqual("2018_10");
  expect(months[1].is_current).toEqual(true);

  expect(months[2].yearMonth).toEqual("2018_11");
  expect(months[2].is_current).toEqual(false);
});

test('updates category budget', () => {
  const storage = new LocalStorageMock();
  const categoryRepository = new CategoryRepository();
  const budgetRepository = new BudgetRepository(storage, categoryRepository);

  const monthlyBudget = budgetRepository.currentMonthlyBudget();
  expect(monthlyBudget.categoryBudgets).toHaveLength(categoryRepository.list().length);

  monthlyBudget.categoryBudgets[0].budgeted = 1000;
  budgetRepository.update(monthlyBudget);
  const updated = budgetRepository.currentMonthlyBudget();

  expect(updated.categoryBudgets).toHaveLength(categoryRepository.list().length);
  expect(monthlyBudget.categoryBudgets[0].budgeted).toEqual(1000);
});


test('calculates previous month', () => {
  const storage = new LocalStorageMock();
  const categoryRepository = new CategoryRepository();
  const budgetRepository = new BudgetRepository(storage, categoryRepository);

  const monthlyBudget = budgetRepository.currentMonthlyBudget();
  const yearMonth = new BudgetRepository.YearMonth("2019_01");
  expect(yearMonth.previousMonth().yearMonth).toEqual("2018_12");
});
