import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ExpenseForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    onSubmit: (e, submit) => console.warn("Unhadled onSubmit"),
    categories: [],
  };

  static propTypes = {
    categories: PropTypes.array,
    onSubmit: PropTypes.func,
  };

  captureInput(event) {
    let {name, value} = event.target;
    this.setState({[name]: value});
  }

  categorySelected(event) {
    let {name, value} = event.target;
    let categorySelected = this.props.categories.filter(c => c.id === parseInt(value))[0];
    this.setState({category: categorySelected});
  }

  formSubmitted() {
    let onSubmit = this.props.onSubmit;
    return (event) => onSubmit(event, this.state);
  }

  render() {
    const categories = this.props.categories.map((category, index) => {
      return <option key={index} value={category.id}>{category.name}</option>
    });

    return (
        <form className='expense-form'>
          <label> Amount
            <input
              type='text'
              className='expense-form-amount'
              name='amount'
              onChange={this.captureInput.bind(this)}
            />
          </label>

          <label>Category
            <select className='expense-form-category' name='category' onChange={this.categorySelected.bind(this)}>
              {categories}
            </select>
          </label>

          <input
            type='submit'
            className='expense-form-submit'
            value='Save'
            onSubmit={this.formSubmitted().bind(this)}
            onClick={this.formSubmitted().bind(this)}
          />
        </form>
    );
  }
}

export default ExpenseForm
