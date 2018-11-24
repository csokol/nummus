import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CategoryRepository from "../../domain/CategoryRepository";
import BudgetRepository from "../../domain/BudgetRepository";
import BudgetInput from "./BudgetInput";
import AmountFormatter from "../AmountFormatter";

class MonthSelector extends Component {
  static propTypes = {
    budgetRepository: PropTypes.instanceOf(BudgetRepository),
  };

  constructor(props) {
    super(props);
  }


  render() {
    let options = this.props.budgetRepository.listMonths().map(month => {
      let date = moment(month, "YYYY_MM").format("MMM YY");
      return <option value={month}>{date}</option>
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
