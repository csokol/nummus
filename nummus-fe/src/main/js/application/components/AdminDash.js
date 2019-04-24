import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExpenseRepository from "../../domain/ExpenseRepository";

class AdminDash extends Component {
  static propTypes = {
    expenseRepository: PropTypes.instanceOf(ExpenseRepository),
  };

  constructor(props) {
    super(props);
  }

  loadDump() {
    this.props.expenseRepository.loadDump(this._dumpInput.value);
  }

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <pre>{this.props.expenseRepository.dump()}</pre>
        <textarea
          ref={(node) => this._dumpInput = node}
          value={this.props.expenseRepository.dump()}
        />
        <button
          ref={(node) => this._submitButton = node}
          onClick={this.loadDump.bind(this)}>
          Load dump
        </button>
      </div>
    );
  }

  getAmount(categoryBudget) {
    return this.state.remainingAmounts.get(categoryBudget.categoryId);
  }
}

export default AdminDash;
