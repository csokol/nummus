import React, {Component} from 'react';
import '../css/foundation.min.css';
import '../css/App.css';
import '../css/index.css';
import ExpenseForm from "./ExpenseForm";
import FoundationDemo from "./FoundationDemo";


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
      <div className="grid-container">
        <div className="grid-x grid-padding-x">
          <div className="large-12 cell">
            <h1>Nummus</h1>
          </div>
          <div className="large-6 medium-6 cell">
            <ExpenseForm
                categories={this.categories}
            />
          </div>
          <div className="large-6 medium-6 cell">
          </div>
        </div>
      </div>

    );
  }
}

export default App;
