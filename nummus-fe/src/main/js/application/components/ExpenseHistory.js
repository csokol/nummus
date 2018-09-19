import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpenseRepository from "../../domain/ExpenseRepository";
import AmountFormatter from "../AmountFormatter";


class ExpenseHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expenses: this.props.expenseRepository.list()
    };
  }

  static propTypes = {
    expenseRepository: PropTypes.instanceOf(ExpenseRepository),
    categoriesById: PropTypes.object,
  };

  makeItem(expense, index) {
    let category = this.props.categoriesById.get(expense.categoryId);
    const formattedAmount = AmountFormatter.fromCents(expense.amountCents).formatted();
    return (<tr key={index}>
      <td>{expense.formattedDate()}</td>
      <td>€{formattedAmount}</td>
      <td>{category.name}</td>
      <td>
        <input
          type='button'
          value='Delete'
          className='delete-expense alert button expanded'
          onClick={this.deleteExpense(expense).bind(this)}
        />
      </td>
    </tr>)
  }

  render() {
    const rows = this.state.expenses.map(this.makeItem.bind(this));
    return (<table>
      <tbody>
        {rows}
      </tbody>
    </table>);
  }

  deleteExpense(expense) {
    return () => {
      this.props.expenseRepository.delete(expense);
      this.setState({ expenses: this.props.expenseRepository.list()});
    }
  }
}

export default ExpenseHistory
