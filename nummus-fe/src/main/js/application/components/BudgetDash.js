import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CategoryRepository from "../../domain/CategoryRepository";
import BudgetRepository from "../../domain/BudgetRepository";

class BudgetDash extends Component {
  static propTypes = {
    budgetRepository: PropTypes.instanceOf(BudgetRepository),
    categoryRepository: PropTypes.instanceOf(CategoryRepository),
  };

  constructor(props) {
    super(props);
    this.categoriesById = this.props.categoryRepository.categoriesById();
  }

  render() {
    const budget = this.props.budgetRepository.currentMonthlyBudget();
    const tbody = budget.categoryBudgets.map(categoryBudget =>
      <tr key={categoryBudget.id}>
        <td>{this.categoriesById.get(categoryBudget.categoryId).name}</td>
        <td>€{categoryBudget.formatedBudgetedAmount()}</td>
        <td>€00.00</td>
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
}

export default BudgetDash;
