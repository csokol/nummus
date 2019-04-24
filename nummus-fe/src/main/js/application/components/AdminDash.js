import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExpenseRepository from "../../domain/ExpenseRepository";

class AdminDash extends Component {
  static propTypes = {
    expenseRepository: PropTypes.instanceOf(ExpenseRepository),
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.state.dump = this.props.expenseRepository.dump();
  }

  loadDump() {
    this.props.expenseRepository.loadDump(this.state.dump);
  }

  textAreaChanged(event) {
    this.setState({
      dump: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <textarea
          ref={(node) => this._dumpInput = node}
          value={this.state.dump}
          onChange={this.textAreaChanged.bind(this)}
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
