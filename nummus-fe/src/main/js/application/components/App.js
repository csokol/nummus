import React, {Component} from 'react';
import '../../../css/foundation.min.css';
import '../../../css/App.css';
import '../../../css/index.css';
import ExpenseForm from "./ExpenseForm";
import ExpenseHistory from "./ExpenseHistory";
import Expense from "../../domain/Expense";

const nummusPrefix = "nummus.io.";
const expenseKeysKey = nummusPrefix + "expenseKeys";

class App extends Component {

  constructor(props) {
    super(props);
    this.categories = [
      { name: 'fun money', id: 1 },
      { name: 'groceries', id: 2 },
    ];
    this.categoriesById = this.categories.reduce((map, v) => map.set(v.id, v), new Map());
    this.expenses = this.getExpenseKeys()
      .map(localStorage.getItem.bind(localStorage))
      .map(JSON.parse)
      .map(obj => new Expense(obj.amountCents, obj.categoryId));
  }

  render() {
    return (
      <div className="grid-container">
        <div className="grid-x grid-padding-x">
          <div className="large-12 cell">
            <h1>Nummus</h1>
          </div>
          <div className="large-6 medium-6 cell">
            <ExpenseForm
                categories={this.categories}
                onSubmit={this.expenseAdded.bind(this)}
            />
          </div>
          <div className="large-6 medium-6 cell">
            <ExpenseHistory
                categoriesById={this.categoriesById}
                expenses={this.expenses}
                ref={(node) => this._expenseHistory = node}
            />
          </div>
        </div>
      </div>

    );
  }

  expenseAdded(event, state) {
    event.preventDefault();

    let expense = Expense.createFromState(state);
    let key = nummusPrefix + "expenses.foo";
    let expenseKeys = this.getExpenseKeys();
    localStorage.setItem(key, JSON.stringify(expense));
    expenseKeys.push(key);
    localStorage.setItem(expenseKeysKey, JSON.stringify(expenseKeys));

    this.expenses.push(expense);
    this._expenseHistory.setState({
      expenses: this.expenses
    });
  }

  getExpenseKeys() {
    const arrayJson = localStorage.getItem(expenseKeysKey) || '[]';
    return JSON.parse(arrayJson);
  }
}

export default App;
