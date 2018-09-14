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

  render() {
    return (<ul></ul>);
  }
}

export default ExpenseHistory
