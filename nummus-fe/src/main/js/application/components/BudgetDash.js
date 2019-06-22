import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CategoryRepository from "../../domain/CategoryRepository";
import BudgetRepository from "../../domain/BudgetRepository";
import BudgetInput from "./BudgetInput";
import AmountFormatter from "../AmountFormatter";

class BudgetDash extends Component {
  static propTypes = {
    categoryRepository: PropTypes.instanceOf(CategoryRepository),
    amountSpentByCategory: PropTypes.instanceOf(Map),
    selectedMonth: PropTypes.instanceOf(BudgetRepository.YearMonth),
  };

  constructor(props) {
    super(props);
    this.categoriesById = this.props.categoryRepository.categoriesById();
  }

  render() {
    const tbody = Array.from(this.categoriesById).map(([id, category])  =>
      <tr key={id}>
        <td>{this.categoriesById.get(id).name}</td>
        <td>
          €{this.getAmount(id)}
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
              <th>Total spent</th>
            </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </table>
      </div>
    );
  }

  getAmount(categoryId) {
    let amount = this.props.amountSpentByCategory.get(categoryId) || 0;
    return AmountFormatter.fromCents(amount).formatted();
  }
}

export default BudgetDash;
