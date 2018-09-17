import React, {Component} from 'react';
import '../css/foundation.min.css';
import '../css/App.css';
import '../css/index.css';
import ExpenseForm from "./ExpenseForm";
import ExpenseHistory from "./ExpenseHistory";


class App extends Component {

  constructor(props) {
    super(props);
    this.categories = [
      { name: 'fun money', id: 1 },
      { name: 'groceries', id: 2 },
    ];
    this.categoriesById = this.categories.reduce((map, v) => map.set(v.id, v), new Map());
    this.expenses = [];
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
    this.expenses.push({amount: state.amount, categoryId: state.category.id});
    this._expenseHistory.setState({
      expenses: this.expenses
    });
  }
}

export default App;
