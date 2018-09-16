import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ExpenseHistory extends Component {

  constructor(props) {
    super(props);
  }

  static defaultProps = {
  };

  static propTypes = {
    expenses: PropTypes.array,
    categoriesById: PropTypes.object,
  };

  makeItem(expense, index) {
    let category = this.props.categoriesById.get(expense.categoryId);
    return (<tr key={index}>
      <td>{expense.amount}</td>
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
