import React, { Component } from 'react';
import ExpensesDash from "./ExpensesDash";
import BudgetDash from "./BudgetDash";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import ExpenseForm from "./ExpenseForm";
import UUIDGenerator from "../../domain/UUIDGenerator";

class App extends Component {
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
              </ul>
            </div>
          </div>
          <div className="grid-container main-container">
            <Route exact path="/" component={() => <ExpensesDash idGenerator={new UUIDGenerator()} />}/>
            <Route path="/budget" component={BudgetDash}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
