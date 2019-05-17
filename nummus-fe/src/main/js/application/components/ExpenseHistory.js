import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExpenseRepository from "../../domain/ExpenseRepository";
import AmountFormatter from "../AmountFormatter";
import BudgetRepository from "../../domain/BudgetRepository";


class ExpenseHistory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expenses: this.props.expenses,
      showCsv: false
    };
  }

  static propTypes = {
    expenseRepository: PropTypes.instanceOf(ExpenseRepository),
    selectedMonth: PropTypes.instanceOf(BudgetRepository.YearMonth),
    expenses: PropTypes.array,
    categoriesById: PropTypes.object,
  };

  makeItem(expense, index) {
    let category = this.props.categoriesById.get(expense.categoryId);
    const formattedAmount = AmountFormatter.fromCents(expense.amountCents).formatted();
    return (<tr className="expense-row" key={index}>
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
    return (
      <div>
        <table>
          <tbody>
          {rows}
          </tbody>
        </table>
        <button className="button expanded large" onClick={() => this.setState({showCsv: !this.state.showCsv})}>As csv</button>
        <div className={this.state.showCsv ? "" : "hide"}>
          <pre>{this.expensesAsCsv()}</pre>
        </div>
      </div>
    );
  }

  deleteExpense(expense) {
    return () => {
      this.props.expenseRepository.delete(expense);
      this.setState({expenses: this.props.expenseRepository.findBy(this.props.selectedMonth)});
    }
  }

  expensesAsCsv() {
    return this.props.expenses.map(e => {
      const formattedAmount = AmountFormatter.fromCents(e.amountCents, ",").formatted();
      let category = this.props.categoriesById.get(e.categoryId);
      return `${e.formattedDate()}\t${formattedAmount}\t${category.name}\t${category.tags}\t${e.comment || ""}`
    }).reverse().join("\n") + "\n\n";
  }
}

export default ExpenseHistory
