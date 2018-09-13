import React, {Component} from 'react';
import '../css/App.css';
import '../css/index.css';
import ExpenseForm from "./ExpenseForm";
import CssBaseline from '@material-ui/core/CssBaseline';


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
        <React.Fragment>
          <CssBaseline />
          <div className="container">
            <ExpenseForm
                categories={this.categories}
            />
          </div>
        </React.Fragment>
    );
  }
}

export default App;
