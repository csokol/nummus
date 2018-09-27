import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AmountFormatter from "../AmountFormatter";

class AmountInput extends Component {

  constructor(props) {
    super(props);
    this.amountFormatter = AmountFormatter.fromCents(this.props.initialValue);
    this._amount = null;
    this.state = {value: this.props.initialValue};
  }

  static defaultProps = {
    onDigit: () => console.warn("Unhadled onDigit"),
    onAmountChanged: () => undefined,
    className: 'input-group-field amount-input',
    initialValue: 0,
  };

  static propTypes = {
    onDigit: PropTypes.func,
    onAmountChanged: PropTypes.func,
    initialValue: PropTypes.number,
    inputClass: PropTypes.string,
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
    }
    this._amount.value = this.amountFormatter.formatted();
    this.props.onAmountChanged(this.amountFormatter.valueCents());
    this.setState({value: this.amountFormatter.valueCents()});
  }

  render() {
    return (
      <input
        type='number'
        className={this.props.inputClass}
        name='amount'
        onKeyDown={this.amountChanged.bind(this)}
        ref={(node) => this._amount = node}
        defaultValue={this.amountFormatter.formatted()}
      />
    );
  }
}

export default AmountInput
