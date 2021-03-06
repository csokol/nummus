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
      let percentage = this.props.amountSpent.rate;
      rate = <span>({percentage}%)</span>
    }
    return <tr>
      <td>{this.props.categoryName}</td>
      <td>
        €{AmountFormatter.fromCents(this.props.amountSpent.amount).formatted()} {rate}
      </td>
      <td>
        €{AmountFormatter.fromCents(this.props.amountSpent.spentPreviousMonth).formatted()}
      </td>
      <td>
        €{AmountFormatter.fromCents(this.props.amountSpent.projected).formatted()}
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
    let totalAmountSpent = Array.from(this.categoriesById)
      .map(([id, category]) => {
        return this._getAmountSpent(id).amount;
      }).reduce((acc, amount) => acc + amount, 0);
    this.totalAmountSpent = AmountFormatter.fromCents(totalAmountSpent).formatted()
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
            <th>Previous month</th>
            <th>Projected</th>
          </tr>
          </thead>
          <tbody>
          {tbody}
          </tbody>
        </table>
        <p>Total expenses: €{this.totalAmountSpent}</p>
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
