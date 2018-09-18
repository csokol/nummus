import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Expense from "../../domain/Expense";
import AmountFormatter from "../AmountFormatter";


class ExpenseHistory extends Component {

  static propTypes = {
    expenses: PropTypes.arrayOf(PropTypes.instanceOf(Expense)),
    categoriesById: PropTypes.object,
  };

  makeItem(expense, index) {
    let category = this.props.categoriesById.get(expense.categoryId);
    const formattedAmount = AmountFormatter.fromCents(expense.amountCents).formatted();
    return (<tr key={index}>
      <td>{formattedAmount}</td>
      <td>{category.name}</td>
    </tr>)
  }

  render() {
    const rows = this.props.expenses.map(this.makeItem.bind(this));
    return (<table>
      <tbody>
        {rows}
      </tbody>
    </table>);
  }
}

export default ExpenseHistory
