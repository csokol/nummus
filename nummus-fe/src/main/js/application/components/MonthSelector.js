import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import BudgetRepository from "../../domain/BudgetRepository";

class MonthSelector extends Component {
  static propTypes = {
    budgetRepository: PropTypes.instanceOf(BudgetRepository),
  };

  render() {
    let options = this.props.budgetRepository.listMonths().map(month => {
      let date = moment(month, "YYYY_MM").format("MMM YY");
      return <option value={month} key={month}>{date}</option>
    });
    return (
      <div>
        <select>
          {options}
        </select>
      </div>
    );
  }

}

export default MonthSelector;
