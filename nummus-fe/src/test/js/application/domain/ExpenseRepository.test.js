// Link.react.test.js
import Expense from '../../../../main/js/domain/Expense';
import ExpenseRepository from "../../../../main/js/domain/ExpenseRepository";
import LocalStorageMock from "../LocalStorageMock";
import moment from 'moment';

test('stores expenses', () => {
  const localStorage = new LocalStorageMock();
  const expenses = new ExpenseRepository(localStorage);
  const expense = new Expense({id: 1, amountCents: 100, categoryId: 10});
  expenses.add(expense);

  let firstExpense = expenses.list()[0];
  expect(firstExpense).toEqual(expense);
  expect(firstExpense.formattedDate()).toEqual(moment().format("DD-MM-YYYY"));
});

test('stores expenses with no date', () => {
  const localStorage = new LocalStorageMock();
  const expenses = new ExpenseRepository(localStorage);
  const expense = new Expense({id: 1, amountCents: 100, categoryId: 10});
  expense.date = undefined;
  expenses.add(expense);

  expect(expenses.list()).toHaveLength(1);
  expect(expenses.list()[0]).toEqual(expense);
  localStorage.clear();
});

test('aggregates expenses by category', () => {
  const localStorage = new LocalStorageMock();
  const expenses = new ExpenseRepository(localStorage);

  expenses.add(new Expense({id: 1, amountCents: 100, categoryId: 1}));
  expenses.add(new Expense({id: 2, amountCents: 200, categoryId: 1}));
  expenses.add(new Expense({id: 3, amountCents: 100, categoryId: 2}));
  expenses.add(new Expense({id: 4, amountCents: 150, categoryId: 2}));
  expenses.add(new Expense({id: 5, amountCents: 100, categoryId: 3}));

  const amountsByCategory = expenses.amountsByCategory();

  expect(amountsByCategory.get(1)).toEqual(300);
  expect(amountsByCategory.get(2)).toEqual(250);
  expect(amountsByCategory.get(3)).toEqual(100);
});




