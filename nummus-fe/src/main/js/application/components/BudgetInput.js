import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AmountInput from "./AmountInput";
import CategoryBudget from "../../domain/CategoryBudget";

const unit = x => x;
class BudgetInput extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    categoryBudget: PropTypes.instanceOf(CategoryBudget),
    budgetUpdated: PropTypes.func,
  };

  static defaultProps = {
    budgetUpdated: () => undefined
  };

  updateBudget(newAmount) {
    this.props.categoryBudget.setBudget(newAmount);
    this.props.budgetUpdated();
  }

  render() {
    return (
      <div className="input-group budget-input-group">
        <span className="input-group-label">€</span>
        <AmountInput
          ref={node => this._amountInput = node}
          initialValue={this.props.categoryBudget.budgeted}
          onDigit={unit}
          onAmountChanged={this.updateBudget.bind(this)}
          inputClass='budget-input'
        />
      </div>
    );
  }
}

export default BudgetInput
