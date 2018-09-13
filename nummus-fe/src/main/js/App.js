import React, {Component} from 'react';
import '../css/App.css';
import '../css/index.css';
import ExpenseForm from "./ExpenseForm";


class App extends Component {

  constructor(props) {
    super(props);
    this.categories = [
      { name: 'fun money', id: 1 },
      { name: 'groceries', id: 2 },
    ]
  }

  render() {
    return (
      <div className="container">
        <ExpenseForm
            categories={this.categories}
        />
      </div>
    );
  }
}

export default App;
