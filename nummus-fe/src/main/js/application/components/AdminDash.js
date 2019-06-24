import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExpenseRepository from "../../domain/ExpenseRepository";

let API_ENDPOINT = "https://mgdd4jfbph.execute-api.us-east-1.amazonaws.com/prod";

class AdminDash extends Component {
  static propTypes = {
    expenseRepository: PropTypes.instanceOf(ExpenseRepository),
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.state.dump = this.props.expenseRepository.dump();
    this.state.uploadCompleted = "";
    this.state.apiKey = this.props.expenseRepository.apiKey();
    this.state.userUuid = this.props.expenseRepository.userUuid();
  }

  loadDump() {
    this.props.expenseRepository.loadDump(this.state.dump);
  }

  textAreaChanged(event) {
    this.setState({
      dump: event.target.value
    });
  }

  apiKeyChanged(event) {
    this.setState({
      apiKey: event.target.value
    });
    this.props.expenseRepository.saveApiKey(event.target.value);
  }

  uuidChanged(event) {
    this.setState({
      userUuid: event.target.value
    });
    this.props.expenseRepository.setUserUuid(event.target.value);
  }

  uploadExpenses() {
    let component = this;
    debugger;
    let promise = fetch(
      `${API_ENDPOINT}/sync/${this.state.userUuid}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'x-api-key': this.state.apiKey,
        },
        body: this.state.dump,
      }
    );

    promise.then(response => response.json())
      .then(response => component.setState({
          uploadCompleted: "Upload completed: " + JSON.stringify(response),
        }
      ))
  }

  downloadExpenses() {
    let component = this;
    let promise = fetch(
      `${API_ENDPOINT}/sync/${this.state.userUuid}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'x-api-key': this.state.apiKey,
        }
      }
    );

    promise
      .then(response => response.json())
      .then(json => {
        component.setState({
          dump: JSON.stringify(json),
          downloadCompleted: "Download completed",
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Admin</h1>

        <div className="form-group">
          <label htmlFor="apiKey">Api key</label>
          <input value={this.state.apiKey}
                 className="form-control"
                 type="text"
                 id="apiKey"
                 placeholder="Enter api key"
                 onChange={this.apiKeyChanged.bind(this)}/>

          <label htmlFor="userUuid">User uuid</label>
          <input value={this.state.userUuid}
                 className="form-control"
                 type="text"
                 id="userUuid"
                 placeholder="Enter user UUID"
                 onChange={this.uuidChanged.bind(this)}/>
        </div>

        <label>

        </label>
        <hr/>

        <div className="form-group">
          <label htmlFor="expensesData">Expenses dump</label>
          <textarea
            id="expensesData"
            value={this.state.dump}
            className="form-control"
            onChange={this.textAreaChanged.bind(this)}
          />
        </div>

        <button
          className='expense-form-submit button'
          onClick={this.loadDump.bind(this)}>
          Load dump
        </button>

        <hr/>
        <button
          className='expense-form-submit button'
          onClick={this.uploadExpenses.bind(this)}>
          Upload expenses
        </button>

        <div className={this.state.uploadCompleted ? "" : "hide"}>
          <div className="callout success">
            <p>{this.state.uploadCompleted}</p>
          </div>
        </div>

        <hr/>
        <button
          className='expense-form-submit button'
          onClick={this.downloadExpenses.bind(this)}>
          Download expenses
        </button>

        <div className={this.state.downloadCompleted ? "" : "hide"}>
          <div className="callout success">
            <p>{this.state.downloadCompleted}</p>
          </div>
        </div>
      </div>
    );
  }

  getAmount(categoryBudget) {
    return this.state.remainingAmounts.get(categoryBudget.categoryId);
  }
}

export default AdminDash;
