import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ExpenseForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.errors = [];
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

  captureInput(event) {
    let {name, value} = event.target;
    this.setState({[name]: value, errors: []});
  }

  categorySelected(event) {
    let {value} = event.target;
    let categorySelected = this.props.categories.filter(c => c.id === parseInt(value, 10))[0];
    this.setState({category: categorySelected, errors: []});
  }

  formSubmitted() {
    let onSubmit = this.props.onSubmit;
    return (event) => {
      const {amount, category} = this.state;
      const validationErrors = [];
      if (!category) {
        validationErrors.push({where: "category", type: "empty_field"});
      }
      if (!amount) {
        validationErrors.push({where: "amount", type: "empty_field"});
      }
      if (validationErrors.length !== 0) {
        event.preventDefault();
        this.setState({
          errors: { amount: true }
        });
        this.props.onValidationError(validationErrors);
        return;
      }
      onSubmit(event, this.state);
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
                <input
                  type='number'
                  className="input-group-field"
                  name='amount'
                  onChange={this.captureInput.bind(this)}
                  ref={(node) => this._amount = node}
                />
              </div>
              <span className={this.errors.amount ? 'form-error is-visible' : 'form-error'}>
                Amount cannot be empty
              </span>
            </div>
          </label>

          <label>Category
            <select
              defaultValue={0}
              className='expense-form-category' name='category'
              onChange={this.categorySelected.bind(this)}
              ref={(node) => this._category = node}
            >
              <option value={0} />
              {categories}
            </select>
          </label>

          <input
            type='submit'
            className='expense-form-submit'
            value='Save'
            onSubmit={this.formSubmitted().bind(this)}
            onClick={this.formSubmitted().bind(this)}
            ref={(node) => this._submit = node}
          />
        </form>
    );
  }
}

export default ExpenseForm
