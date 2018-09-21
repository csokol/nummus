import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AmountFormatter from "../AmountFormatter";

class AmountInput extends Component {

  constructor(props) {
    super(props);
    this.amountFormatter = new AmountFormatter();
    this._amount = null;
    this.state = {};
  }

  static defaultProps = {
    onDigit: (key) => console.warn("Unhadled onDigit"),
  };

  static propTypes = {
    onDigit: PropTypes.func,
  };

  amountChanged(event) {
    let {key} = event;
    const keyCode = key.charCodeAt(0);
    if (key === 'Tab') {
      return;
    }
    event.preventDefault();
    const isBackspace = key === 'Backspace';
    const isDigit = keyCode >= '0'.charCodeAt(0) && keyCode <= '9'.charCodeAt(0);
    if (isBackspace) {
      this.amountFormatter.backspace();
    } else if (isDigit) {
      this.amountFormatter.keyDown(String.fromCharCode(keyCode));
      this.props.onDigit(key);
      // this._validationMessages.amount.empty.className = 'form-error';
    }
    this._amount.value = this.amountFormatter.formatted();
    this.setState({value: this.amountFormatter.valueCents()});
  }

  render() {
    return (
      <input
        type='number'
        className="input-group-field amount-input"
        name='amount'
        onKeyDown={this.amountChanged.bind(this)}
        ref={(node) => this._amount = node}
        defaultValue={this.amountFormatter.formatted()}
      />
    );
  }
}

export default AmountInput
