import React, { Component } from 'react';
import ExpensesDash from "./ExpensesDash";
import BudgetDash from "./BudgetDash";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import ExpenseForm from "./ExpenseForm";
import UUIDGenerator from "../../domain/UUIDGenerator";
import CategoryRepository from "../../domain/CategoryRepository";
import BudgetRepository from "../../domain/BudgetRepository";

class App extends Component {

  constructor(props) {
    super(props);
    this.categoryRepository = new CategoryRepository();
    this.budgetRepository = new BudgetRepository(localStorage, this.categoryRepository);
  }

  makeExpensesDash() {
    return <ExpensesDash idGenerator={new UUIDGenerator()} categoryRepository={this.categoryRepository} />
  }

  makeBudgetDash() {
    return <BudgetDash
      categoryRepository={this.categoryRepository}
      budgetRepository={this.budgetRepository}
    />
  }

  render() {
    return (
      <Router>
        <div>
          <div className="top-bar" id="responsive-menu">
            <div className="top-bar-left">
              <ul className="dropdown menu" data-dropdown-menu>
                <li className="menu-text"><Link to="/">Nummus budgeting</Link></li>
                <li>
                  <Link to="/budget">Budget</Link>
                </li>
                <li>
                  <Link to="/">Expense</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-container main-container">
            <Route exact path="/" component={this.makeExpensesDash.bind(this)}/>
            <Route path="/budget" component={this.makeBudgetDash.bind(this)}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
