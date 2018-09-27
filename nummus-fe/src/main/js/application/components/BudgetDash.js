import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CategoryRepository from "../../domain/CategoryRepository";
import BudgetRepository from "../../domain/BudgetRepository";
import BudgetInput from "./BudgetInput";
import AmountFormatter from "../AmountFormatter";

class BudgetDash extends Component {
  static propTypes = {
    budgetRepository: PropTypes.instanceOf(BudgetRepository),
    categoryRepository: PropTypes.instanceOf(CategoryRepository),
    amountSpentByCategory: PropTypes.instanceOf(Map),
  };

  constructor(props) {
    super(props);
    this.categoriesById = this.props.categoryRepository.categoriesById();
    this._budgetInputs = [];
    this._budget = this.props.budgetRepository.currentMonthlyBudget();
    this.remainingAmounts = this._budget.categoryBudgets.reduce((remainingAmounts, budget) => {
      const spent = this.props.amountSpentByCategory.get(budget.categoryId) || 0;
      const remaining = budget.budgeted - spent;
      remainingAmounts.set(budget.categoryId, AmountFormatter.fromCents(remaining).formatted());
      return remainingAmounts;
    }, new Map());
    this.state = {
      remainingAmounts: this.remainingAmounts
    };
  }

  budgetUpdated(categoryBudget) {
    return () => {
      const spent = this.props.amountSpentByCategory.get(categoryBudget.categoryId) || 0;
      const remaining = categoryBudget.budgeted - spent;
      this.state.remainingAmounts.set(categoryBudget.categoryId, AmountFormatter.fromCents(remaining).formatted());
      this.setState({
        remainingAmounts: this.state.remainingAmounts
      });
      this.props.budgetRepository.update(this._budget);
    }
  }

  remainingAmount(categoryBudget) {
    const spent = this.props.amountSpentByCategory.get(categoryBudget.categoryId) || 0;
    const remaining = categoryBudget.budgeted - spent;
    return AmountFormatter.fromCents(remaining).formatted();
  }

  render() {
    const tbody = this._budget.categoryBudgets.map(categoryBudget =>
      <tr key={categoryBudget.id}>
        <td>{this.categoriesById.get(categoryBudget.categoryId).name}</td>
        <td>
          <BudgetInput
            ref={node => this._budgetInputs.push(node)}
            categoryBudget={categoryBudget}
            budgetUpdated={this.budgetUpdated(categoryBudget).bind(this)}
          />
        </td>
        <td>
          €{this.getAmount(categoryBudget)}
        </td>
      </tr>
    );
    return (
      <div>
        <h1>Budget dash</h1>
        <table>
          <thead>
            <tr className='category-budget'>
              <th>Category</th>
              <th>Budgeted</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </table>
      </div>
    );
  }

  getAmount(categoryBudget) {
    return this.state.remainingAmounts.get(categoryBudget.categoryId);
  }
}

export default BudgetDash;
