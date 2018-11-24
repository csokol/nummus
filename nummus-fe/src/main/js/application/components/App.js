import React, {Component} from 'react';
import ExpensesDash from "./ExpensesDash";
import BudgetDash from "./BudgetDash";
import MonthSelector from "./MonthSelector";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import UUIDGenerator from "../../domain/UUIDGenerator";
import CategoryRepository from "../../domain/CategoryRepository";
import BudgetRepository from "../../domain/BudgetRepository";
import ExpenseRepository from "../../domain/ExpenseRepository";

class App extends Component {

  constructor(props) {
    super(props);
    this.categoryRepository = new CategoryRepository();
    this.budgetRepository = new BudgetRepository(localStorage, this.categoryRepository);
    this.expenseRepository = new ExpenseRepository(localStorage);
  }

  makeExpensesDash() {
    return <ExpensesDash idGenerator={new UUIDGenerator()} categoryRepository={this.categoryRepository} />
  }

  makeBudgetDash() {
    return <BudgetDash
      categoryRepository={this.categoryRepository}
      budgetRepository={this.budgetRepository}
      amountSpentByCategory={this.expenseRepository.amountsByCategory()}
    />
  }

  render() {
    return (
      <Router>
        <div>
          <div className="top-bar" id="responsive-menu">
            <div className="top-bar-left">
              <ul className="dropdown menu" data-dropdown-menu>
                <li className="menu-text"><Link to="/nummus/">Nummus budgeting</Link></li>
                <li>
                  <Link to="/nummus/budget/">Budget</Link>
                </li>
                <li>
                  <Link to="/nummus/">Expense</Link>
                </li>
                <li>
                  <MonthSelector budgetRepository={this.budgetRepository}/>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-container main-container">
            <Route exact path="/nummus/" component={this.makeExpensesDash.bind(this)}/>
            <Route path="/nummus/budget/" component={this.makeBudgetDash.bind(this)}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
