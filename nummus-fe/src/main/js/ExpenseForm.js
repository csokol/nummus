import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save'


class ExpenseForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    onSubmit: (submit) => console.warn("Unhadled onSubmit"),
    categories: [],
  };

  static propTypes = {
    categories: PropTypes.array,
    onSubmit: PropTypes.fun,
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
    return (event) =>
        onSubmit(event, this.state);
  }

  render() {
    const categories = this.props.categories.map((category, index) => {
      return <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
    });

    return (
        <form className='expense-form'>
          <TextField className='expense-form-amount' label='Amount' type='text' name='amount' onChange={this.captureInput.bind(this)}/>

          <Select className='expense-form-category' label='Category' name='category' onChange={this.categorySelected.bind(this)}>
            {categories}
          </Select>

          <Button
            className='expense-form-submit'
            variant="contained"
            size="small"
            onSubmit={this.formSubmitted().bind(this)}
            onClick={this.formSubmitted().bind(this)}>

            <SaveIcon />
            Save
          </Button>
        </form>
    );
  }
}

export default ExpenseForm
