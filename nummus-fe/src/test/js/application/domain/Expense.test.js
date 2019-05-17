// Link.react.test.js
import Expense from '../../../../main/js/domain/Expense';
import ExpenseRepository from "../../../../main/js/domain/ExpenseRepository";
import LocalStorageMock from "../LocalStorageMock";
import moment from 'moment';
import BudgetRepository from "../../../../main/js/domain/BudgetRepository";

test('formats date', () => {
  let expense = new Expense({id: 1, amountCents: 100, categoryId: 1}, () => moment("01-10-2018 12:30", "DD-MM-YYYY HH:mm"));

  expect(expense.formattedDate()).toEqual("01-10-2018 12:30");
});

test('parses json without date time', () => {
  let expense = Expense.fromJsonObj(
    {
      id: 1,
      amountCents: 100,
      categoryId: 1,
      date: {
        year: 2018,
        month: 10,
        day: 1,
      }
    }
  );

  expect(expense.formattedDate()).toEqual("01-10-2018 12:00");
});

test('parses json', () => {
  let expense = Expense.fromJsonObj(
    {
      id: 1,
      amountCents: 100,
      categoryId: 1,
      comment: "some comment"
    }
  );

  expect(expense.comment).toEqual("some comment");
  expect(expense.amountCents).toEqual(100);
  expect(expense.categoryId).toEqual(1);
});
