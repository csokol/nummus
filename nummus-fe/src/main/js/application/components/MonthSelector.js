import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BudgetRepository from "../../domain/BudgetRepository";

class MonthSelector extends Component {
  static propTypes = {
    budgetRepository: PropTypes.instanceOf(BudgetRepository),
    onMonthChanged: PropTypes.func,
  };

  monthChanged(event) {
    this.props.onMonthChanged(this.props.budgetRepository.findMonth(event.target.value));
  }

  render() {
    let months = this.props.budgetRepository.listMonths();
    let currentMonth = this.props.budgetRepository.currentMonth();
    let options = months.map(month => {
      return <option
        value={month.yearMonth}
        key={month.yearMonth}>
        {month.formatted()}
      </option>
    });
    return (
      <div>
        <select
          defaultValue={currentMonth.yearMonth}
          onChange={this.monthChanged.bind(this)}>
          {options}
        </select>
      </div>
    );
  }

}

export default MonthSelector;
