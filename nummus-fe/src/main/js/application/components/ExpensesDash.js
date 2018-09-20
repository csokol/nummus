import React, {Component} from 'react';
import '../../../css/App.css';
import '../../../css/index.css';
import ExpenseForm from "./ExpenseForm";
import ExpenseHistory from "./ExpenseHistory";
import Expense from "../../domain/Expense";
import ExpenseRepository from "../../domain/ExpenseRepository";
import CategoryRepository from "../../domain/CategoryRepository";
import AutoIncrementIdGenerator from "../../domain/AutoIncrementIdGenerator";
import PropTypes from 'prop-types';

class ExpensesDash extends Component {

  constructor(props) {
    super(props);
    this.categories = this.props.categoryRepository.list();
    this.categoriesById = this.props.categoryRepository.categoriesById();
    this.expenseRepository = new ExpenseRepository(localStorage);
    this.expenses = this.expenseRepository.list();
  }

  static defaultProps = {
    idGenerator: new AutoIncrementIdGenerator(),
  };

  static propTypes = {
    idGenerator: PropTypes.shape({
      next: PropTypes.func,
    }),
    categoryRepository: PropTypes.instanceOf(CategoryRepository),
  };


  render() {
    return (
      <div className="grid-x grid-padding-x">
          <div className="large-6 medium-6 cell">
            <ExpenseForm
                categories={this.categories}
                onSubmit={this.expenseAdded.bind(this)}
            />
          </div>
          <div className="large-6 medium-6 cell">
            <ExpenseHistory
                categoriesById={this.categoriesById}
                expenseRepository={this.expenseRepository}
                ref={(node) => this._expenseHistory = node}
            />
          </div>
      </div>
    );
  }

  expenseAdded(event, state) {
    event.preventDefault();

    const nextId = this.props.idGenerator.next();
    let expense = Expense.createFromState(nextId, state);
    this.expenseRepository.add(expense);

    this.expenses.push(expense);
    this._expenseHistory.setState({
      expenses: this.expenseRepository.list()
    });
  }
}

export default ExpensesDash;
