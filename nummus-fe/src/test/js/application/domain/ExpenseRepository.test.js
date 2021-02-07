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

function oct2018() {
  return moment("01-10-2018 12", "DD-MM-YYYY hh");
}

function nov2018() {
  return moment("01-11-2018 12", "DD-MM-YYYY hh");
}

function dec2018() {
  return moment("01-12-2018 12", "DD-MM-YYYY hh");
}

test('stores multiple expenses', () => {
  const localStorage = new LocalStorageMock();
  const expenses = new ExpenseRepository(localStorage);

  const expense1 = {
    "id": "1",
    "amountCents": 100,
    "categoryId": 1,
    "deleted": false,
    "date": {
      "day": 1,
      "month": 10,
      "year": 2018,
      "hour": 0,
      "minute": 0
    }
  };

  const expense2 = {
    "id": "2",
    "amountCents": 100,
    "categoryId": 2,
    "deleted": false,
    "date": {
      "day": 1,
      "month": 11,
      "year": 2018,
      "hour": 0,
      "minute": 0
    }
  };

  const expense3 = {
    "id": "3",
    "amountCents": 100,
    "categoryId": 3,
    "deleted": false,
    "date": {
      "day": 1,
      "month": 12,
      "year": 2018,
      "hour": 0,
      "minute": 0
    }
  };

  const expense1Object = new Expense({id: "1", amountCents: 100, categoryId: 1}, oct2018);
  const expense2Object = new Expense({id: "2", amountCents: 100, categoryId: 2}, nov2018);
  const expense3Object = new Expense({id: "3", amountCents: 100, categoryId: 3}, dec2018);

  expenses.add(expense3Object);
  expenses.addRawExpenses([expense1, expense2, expense3]);
  let allExpenses = expenses.list();

  expect(allExpenses).toHaveLength(3);
  expect(allExpenses[0]).toEqual(expense3Object);
  expect(allExpenses[1]).toEqual(expense2Object);
  expect(allExpenses[2]).toEqual(expense1Object);

  expect(expenses.findBy(new BudgetRepository.YearMonth("2018_10"))).toHaveLength(1);
  expect(expenses.findBy(new BudgetRepository.YearMonth("2018_11"))).toHaveLength(1);
  expect(expenses.findBy(new BudgetRepository.YearMonth("2018_12"))).toHaveLength(1);
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

test('deletes multiple keys', () => {
  const localStorage = new LocalStorageMock();
  const expenses = new ExpenseRepository(localStorage);
  const expense = new Expense({id: 3, amountCents: 300, categoryId: 10});

  function fixedDateProvider() {
    return moment("01-10-2018", "MM-DD-YYYY");
  }

  expenses.add(new Expense({id: 1, amountCents: 100, categoryId: 1}, fixedDateProvider));
  expenses.add(new Expense({id: 2, amountCents: 200, categoryId: 1}, fixedDateProvider));

  expenses.add(expense);

  expenses.deleteKeys([1, 2]);
  let firstExpense = expenses.list()[0];

  expect(firstExpense).toEqual(expense);
  expect(expenses.list().length).toEqual(1);
})

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
  expect(jsonString).toEqual(JSON.stringify(JSON.parse("[\n  {\n    \"id\": 1,\n    \"amountCents\": 100,\n    \"categoryId\": 1,\n    \"deleted\": false,\n    \"date\": {\n      \"day\": 10,\n      \"month\": 1,\n      \"year\": 2018,\n      \"hour\":12,\n      \"minute\":0\n    }\n  },\n  {\n    \"id\": 2,\n    \"amountCents\": 200,\n    \"categoryId\": 1,\n    \"deleted\": false,\n    \"date\": {\n      \"day\": 10,\n      \"month\": 1,\n      \"year\": 2018,\n      \"hour\":12,\n      \"minute\":0\n    }\n  }\n]")));
});

test('imports json dump', () => {
  const localStorage = new LocalStorageMock();
  const expenses = new ExpenseRepository(localStorage);
  function fixedDateProvider() {
    return moment("01-10-2018 12:00", "MM-DD-YYYY HH:mm");
  }

  // language=JSON
  let json = `
    [
      {
        "id": 1,
        "amountCents": 100,
        "categoryId": 1,
        "date": {
          "day": 10,
          "month": 1,
          "year": 2018,
          "hour": 0,
          "minute": 0
        }
      },
      {
        "id": 2,
        "amountCents": 200,
        "categoryId": 1,
        "date": {
          "day": 10,
          "month": 1,
          "year": 2018,
          "hour": 0,
          "minute": 0
        }
      }
    ]
  `;
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

test('migrates data to v2', () => {
  function fixedDateProvider(month = '10') {
    return () => moment(month+"-01-2018 12:00", "MM-DD-YYYY HH:mm");
  }
  const localStorage = new LocalStorageMock();
  localStorage.setItem("nummus.io.expenseKeys", '["nummus.io.expenses.1", "nummus.io.expenses.2"]');
  localStorage.setItem('nummus.io.expenses.1', '{"id":1,"amountCents":100,"categoryId":1,"deleted":false,"date":{"day":1,"month":10,"year":2018,"hour":0,"minute":0}}');
  localStorage.setItem('nummus.io.expenses.2', '{"id":2,"amountCents":101,"categoryId":1,"deleted":false,"date":{"day":1,"month":11,"year":2018,"hour":0,"minute":0}}');
  const expenses = new ExpenseRepository(localStorage);

  let oct = expenses.findBy(new BudgetRepository.YearMonth("2018_10"));
  let nov = expenses.findBy(new BudgetRepository.YearMonth("2018_11"));

  expect(localStorage.getItem("v2.nummus.io.months-index.2018_11")).toEqual('[2]');
  expect(localStorage.getItem("v2.nummus.io.months-index.2018_10")).toEqual('[1]');
  expect(localStorage.getItem("nummus.io.version")).toEqual('v2');
  expect(oct).toHaveLength(1);
  expect(nov).toHaveLength(1);
  expect(oct[0]).toEqual(new Expense({id: 1, amountCents: 100, categoryId: 1}, fixedDateProvider('10')));
  expect(nov[0]).toEqual(new Expense({id: 2, amountCents: 101, categoryId: 1}, fixedDateProvider('11')));
});
