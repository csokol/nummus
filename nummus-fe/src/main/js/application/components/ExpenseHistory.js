import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Expense from "../../domain/Expense";


class ExpenseHistory extends Component {

  static defaultProps = {
  };

  static propTypes = {
    expenses: PropTypes.arrayOf(PropTypes.instanceOf(Expense)),
    categoriesById: PropTypes.object,
  };

  makeItem(expense, index) {
    let category = this.props.categoriesById.get(expense.categoryId);
    return (<tr key={index}>
      <td>{expense.amountAsString()}</td>
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
