import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CategoryRepository from "../../domain/CategoryRepository";
import BudgetRepository from "../../domain/BudgetRepository";
import AmountFormatter from "../AmountFormatter";
import AmountSpent from "../../domain/AmountSpent";

class BudgetEntry extends Component {
  static propTypes = {
    amountSpent: PropTypes.instanceOf(AmountSpent),
    categoryName: PropTypes.string,
  };

  render() {
    let rate = '';
    if (this.props.amountSpent.rate) {
      let className = 'positive-rate';
      let percentage = this.props.amountSpent.rate;
      if (this.props.amountSpent.rate < 0) {
        className = 'negative-rate';
      }
      rate = <span className={className}>({percentage}%)</span>
    }
    return <tr>
      <td>{this.props.categoryName}</td>
      <td>
        €{AmountFormatter.fromCents(this.props.amountSpent.amount).formatted()}
      </td>
      <td>
        €{AmountFormatter.fromCents(this.props.amountSpent.projected).formatted()} {rate}
      </td>
      <td>
        €{AmountFormatter.fromCents(this.props.amountSpent.spentPreviousMonth).formatted()}
      </td>
    </tr>
  }
}

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
    const tbody = Array.from(this.categoriesById).map(([id, category]) =>
      <BudgetEntry
        key={id}
        amountSpent={this._getAmountSpent(id)}
        categoryName={this.categoriesById.get(id).name}
      />
    );
    return (
      <div>
        <h1>Budget</h1>
        <table className='category-budget-table'>
          <thead>
          <tr className='category-budget'>
            <th>Category</th>
            <th>Total spent</th>
            <th>Projected</th>
            <th>Previous month</th>
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
    return AmountFormatter.fromCents(this._getAmountSpent(categoryId).amount).formatted();
  }

  getProjection(categoryId) {
    return AmountFormatter.fromCents(this._getAmountSpent(categoryId).projected).formatted();
  }

  _getAmountSpent(categoryId) {
    let amountSpent = this.props.amountSpentByCategory.get(categoryId);
    return amountSpent ? amountSpent : new AmountSpent(0);
  }
}

export default BudgetDash;
