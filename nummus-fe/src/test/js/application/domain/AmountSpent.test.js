// Link.react.test.js
import AmountSpent from '../../../../main/js/domain/AmountSpent';
import LocalStorageMock from "../LocalStorageMock";
import CategoryRepository from "../../../../main/js/domain/CategoryRepository";
import BudgetRepository from "../../../../main/js/domain/BudgetRepository";
import moment from "moment";

test('calculates expense projection', () => {
    function midMonth() {
      return moment("15-06-2018", "DD-MM-YYYY");
    }
    const amountSpent = new AmountSpent(1000, 0, midMonth);
  expect(amountSpent.projected).toEqual(2000);
});
