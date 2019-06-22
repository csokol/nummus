import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AmountFormatter from "../AmountFormatter";

class AmountInput extends Component {

  constructor(props) {
    super(props);
    this.amountFormatter = AmountFormatter.fromCents(this.props.initialValue);
    this._amount = null;
    this.state = {
      value: this.props.initialValue,
      formattedValue: this.amountFormatter.formatted()
    };
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
    event.preventDefault();
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
    this.props.onAmountChanged(this.amountFormatter.valueCents());
    this.setState({
      value: this.amountFormatter.valueCents(),
      formattedValue: this.amountFormatter.formatted()
    });
  }

  clear() {
    this.amountFormatter.clear();
    this.setState({
      value: this.amountFormatter.valueCents(),
      formattedValue: this.amountFormatter.formatted()
    });
  }

  render() {
    return (
      <input
        type='number'
        className={this.props.inputClass}
        name='amount'
        onChange={() => undefined}
        onKeyDown={this.amountChanged.bind(this)}
        ref={(node) => {
          this._amount = node;
        }}
        value={this.state.formattedValue}
      />
    );
  }
}

export default AmountInput
