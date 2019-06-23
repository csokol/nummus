// Link.react.test.js
import Expense from '../../../../main/js/domain/Expense';
import ExpenseRepository from "../../../../main/js/domain/ExpenseRepository";
import LocalStorageMock from "../LocalStorageMock";
import moment from 'moment';
import BudgetRepository from "../../../../main/js/domain/BudgetRepository";

test('stores expenses', () => {
  const localStorage = new LocalStorageMock();
  const expenses = new ExpenseRepository(localStorage);
  const expense = new Expense({id: 1, amountCents: 100, categoryId: 10});
  expenses.add(expense);

  let firstExpense = expenses.list()[0];
  expect(firstExpense).toEqual(expense);
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
  function oct2018() {
    return moment("01-10-2018", "DD-MM-YYYY");
  }
  function nov2018() {
    return moment("01-11-2018", "DD-MM-YYYY");
  }

  function sep2018() {
    return moment("01-09-2018", "DD-MM-YYYY");
  }

  expenses.add(new Expense({id: 1, amountCents: 100, categoryId: 1}, oct2018));
  expenses.add(new Expense({id: 2, amountCents: 200, categoryId: 1}, oct2018));
  expenses.add(new Expense({id: 3, amountCents: 100, categoryId: 2}, oct2018));
  expenses.add(new Expense({id: 4, amountCents: 150, categoryId: 2}, oct2018));
  expenses.add(new Expense({id: 5, amountCents: 100, categoryId: 3}, oct2018));
  expenses.add(new Expense({id: 6, amountCents: 250, categoryId: 3}, nov2018));
  expenses.add(new Expense({id: 7, amountCents: 250, categoryId: 3}, sep2018));

  const amountsByCategory = expenses.amountsByCategory(new BudgetRepository.YearMonth("2018_10"));

  expect(amountsByCategory.get(1).amount).toEqual(300);
  expect(amountsByCategory.get(2).amount).toEqual(250);
  expect(amountsByCategory.get(3).amount).toEqual(100);
  expect(amountsByCategory.get(3).spentPreviousMonth).toEqual(250);
});


test('exports expenses in json', () => {
  const localStorage = new LocalStorageMock();
  const expenses = new ExpenseRepository(localStorage);

  function fixedDateProvider() {
    return moment("01-10-2018", "MM-DD-YYYY");
  }

  expenses.add(new Expense({id: 1, amountCents: 100, categoryId: 1}, fixedDateProvider));
  expenses.add(new Expense({id: 2, amountCents: 200, categoryId: 1}, fixedDateProvider));

  const jsonString = expenses.dump();

  // language=JSON
  expect(jsonString).toEqual(JSON.stringify(JSON.parse("[\n  {\n    \"id\": 1,\n    \"amountCents\": 100,\n    \"categoryId\": 1,\n    \"date\": {\n      \"day\": 10,\n      \"month\": 1,\n      \"year\": 2018,\n      \"hour\":12,\n      \"minute\":0\n    }\n  },\n  {\n    \"id\": 2,\n    \"amountCents\": 200,\n    \"categoryId\": 1,\n    \"date\": {\n      \"day\": 10,\n      \"month\": 1,\n      \"year\": 2018,\n      \"hour\":12,\n      \"minute\":0\n    }\n  }\n]")));
});

test('imports json dump', () => {
  const localStorage = new LocalStorageMock();
  const expenses = new ExpenseRepository(localStorage);
  function fixedDateProvider() {
    return moment("01-10-2018 12:00", "MM-DD-YYYY HH:mm");
  }

  // language=JSON
  let json = "[\n  {\n    \"id\": 1,\n    \"amountCents\": 100,\n    \"categoryId\": 1,\n    \"date\": {\n      \"day\": 10,\n      \"month\": 1,\n      \"year\": 2018,\n      \"hour\":0,\n      \"minute\":0\n    }\n  },\n  {\n    \"id\": 2,\n    \"amountCents\": 200,\n    \"categoryId\": 1,\n    \"date\": {\n      \"day\": 10,\n      \"month\": 1,\n      \"year\": 2018,\n      \"hour\":0,\n      \"minute\":0\n    }\n  }\n]";
  expenses.add(new Expense({id: 3, amountCents: 100, categoryId: 1}, fixedDateProvider));

  expenses.loadDump(json);

  expect(expenses.list()).toHaveLength(2);
  expect(expenses.list()[0]).toEqual(new Expense({id: 1, amountCents: 100, categoryId: 1}, fixedDateProvider));
  expect(expenses.list()[1]).toEqual(new Expense({id: 2, amountCents: 200, categoryId: 1}, fixedDateProvider));
});

test('finds by month', () => {
  const localStorage = new LocalStorageMock();
  const expenses = new ExpenseRepository(localStorage);

  expenses.add(new Expense({id: 1, amountCents: 100, categoryId: 1}, () => moment("01-10-2018", "DD-MM-YYYY")));
  expenses.add(new Expense({id: 2, amountCents: 100, categoryId: 1}, () => moment("01-11-2018", "DD-MM-YYYY")));
  expenses.add(new Expense({id: 3, amountCents: 100, categoryId: 1}, () => moment("01-10-2018", "DD-MM-YYYY")));
  expenses.add(new Expense({id: 4, amountCents: 100, categoryId: 1}, () => moment("01-10-2019", "DD-MM-YYYY")));


  expect(expenses.findBy(new BudgetRepository.YearMonth("2018_10"))).toHaveLength(2);
});
