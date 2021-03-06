import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AmountFormatter from "../AmountFormatter";
import AmountInput from "./AmountInput";

class ExpenseForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this._validationMessages = {};
    this.amountFormatter = new AmountFormatter();
  }

  static defaultProps = {
    onSubmit: (e, submit) => console.warn("Unhadled onSubmit"),
    onValidationError: () => console.warn("Unhadled validation error"),
    categories: [],
  };

  static propTypes = {
    categories: PropTypes.array,
    onSubmit: PropTypes.func,
    onValidationError: PropTypes.func,
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
      this._validationMessages.amount.empty.className = 'form-error';
    }
    this._amount.value = this.amountFormatter.formatted();
    this.setState({amount: this.amountFormatter.valueCents()});
  }

  clearErrors() {
    this._validationMessages.amount.empty.className = 'form-error';
  }

  categorySelected(event) {
    let {value} = event.target;
    let categorySelected = this.props.categories.filter(c => c.id === parseInt(value, 10))[0];
    this._validationMessages.category.empty.className = 'form-error';
    this.setState({category: categorySelected});
  }

  formSubmitted() {
    let onSubmit = this.props.onSubmit;
    return (event) => {
      let state = this.state;
      const {category} = state;
      const amount = this._amount.state.value;
      const validationErrors = [];
      if (!category) {
        validationErrors.push({where: "category", type: "empty_field"});
        this._validationMessages.category.empty.className = 'form-error is-visible';
      }
      if (!amount) {
        validationErrors.push({where: "amount", type: "empty_field"});
        this._validationMessages.amount.empty.className = 'form-error is-visible';
      }
      if (validationErrors.length !== 0) {
        event.preventDefault();
        this.props.onValidationError(validationErrors);
        return;
      }
      this.setState({amount: null, category: null, comment: null});
      this.amountFormatter.clear();
      this._amount.value = this.amountFormatter.formatted();
      this._category.value = null;
      this._comment.value = null;
      this._amount.clear();
      onSubmit(event, { ...state, amount: amount });
    }
  }

  render() {
    const categories = this.props.categories.map((category, index) => {
      return <option key={index} value={category.id}>{category.name}</option>
    });

    return (
        <form className='expense-form'>
          <label>
            <div>
            Amount
              <div className="input-group">
                <span className="input-group-label">€</span>
                <AmountInput
                  ref={(node) => this._amount = node}
                  onDigit={this.clearErrors.bind(this)}
                  inputClass='input-group-field amount-input'
                />
              </div>
              <div className='form-error-container'>
                <span ref={node => this._validationMessages.amount = {empty: node}} className='form-error'>
                  Amount cannot be empty
                </span>
              </div>
            </div>
          </label>

          <label>
            <div>
              Category
              <select
                defaultValue={0}
                className='expense-form-category' name='category'
                onChange={this.categorySelected.bind(this)}
                ref={(node) => this._category = node}
              >
                <option value={0} />
                {categories}
              </select>
              <div className='form-error-container'>
                <span ref={node => this._validationMessages.category = {empty: node}} className='form-error'>
                    Category cannot be empty
                </span>
              </div>
            </div>
          </label>
          <label>
            <div>
              Comment
              <input
                ref={(node) => this._comment = node}
                type="text"
                className='expense-form-category' name='category'
                onChange={(event) => this.setState({ comment: event.target.value })}
              >
              </input>
            </div>
          </label>

          <input
            type='submit'
            className='expense-form-submit success button expanded large'
            value='Add expense'
            onSubmit={this.formSubmitted().bind(this)}
            onClick={this.formSubmitted().bind(this)}
            ref={(node) => this._submit = node}
          />
        </form>
    );
  }
}

export default ExpenseForm
