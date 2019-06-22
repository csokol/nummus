import React, {Component} from 'react';
import ExpensesDash from "./ExpensesDash";
import BudgetDash from "./BudgetDash";
import MonthSelector from "./MonthSelector";
import AdminDash from "./AdminDash";
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

    this.state = {
      selectedMonth: this.budgetRepository.currentMonth()
    }
  }

  makeExpensesDash() {
    return <ExpensesDash
      idGenerator={new UUIDGenerator()}
      categoryRepository={this.categoryRepository}
      selectedMonth={this.state.selectedMonth}
    />;
  }

  makeBudgetDash() {
    return <BudgetDash
      categoryRepository={this.categoryRepository}
      budgetRepository={this.budgetRepository}
      amountSpentByCategory={this.expenseRepository.amountsByCategory(this.state.selectedMonth)}
      selectedMonth={this.state.selectedMonth}
    />
  }

  makeAdminDash() {
    return <AdminDash
      expenseRepository={this.expenseRepository}
    />
  }

  monthChanged(month) {
    this.setState({
      selectedMonth: month
    });
  }

  render() {
    return (
      <Router>
        <div>
          <div className="top-bar" id="responsive-menu">
            <div className="top-bar-left">
              <ul className="dropdown menu" data-dropdown-menu>
                <li className="menu-text"><Link to="/nummus/">Nummus</Link></li>
                <li>
                  <Link to="/nummus/budget/">Budget</Link>
                </li>
                <li>
                  <Link to="/nummus/">Expense</Link>
                </li>
                <li>
                  <MonthSelector budgetRepository={this.budgetRepository} onMonthChanged={this.monthChanged.bind(this)}/>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-container main-container">
            <Route exact path="/nummus/" component={this.makeExpensesDash.bind(this)}/>
            <Route path="/nummus/budget/" component={this.makeBudgetDash.bind(this)}/>
            <Route path="/nummus/admin/" component={this.makeAdminDash.bind(this)}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
