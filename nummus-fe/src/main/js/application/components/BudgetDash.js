import React, { Component } from 'react';
import ExpenseForm from "./ExpenseForm";
import ExpenseHistory from "./ExpenseHistory";
import PropTypes from 'prop-types';
import CategoryRepository from "../../domain/CategoryRepository";

class BudgetDash extends Component {
  static propTypes = {
    categoryRepository: PropTypes.instanceOf(CategoryRepository),
  };

  constructor(props) {
    super(props);
  }

  render() {
    const categories = this.props.categoryRepository.list();
    const tbody = categories.map(category =>
      <tr key={category.id}>
        <td>{category.name}</td>
        <td>€00.00</td>
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
