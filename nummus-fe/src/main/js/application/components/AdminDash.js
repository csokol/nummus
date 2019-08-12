import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExpenseRepository from "../../domain/ExpenseRepository";
import SyncService from "../../domain/SyncService";

let API_ENDPOINT = "https://hi6kvr95o9.execute-api.us-east-1.amazonaws.com/prod";


class AdminDash extends Component {
  static propTypes = {
    expenseRepository: PropTypes.instanceOf(ExpenseRepository),
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.state.dump = this.props.expenseRepository.dump();
    this.state.loading = false;
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
    this.setState({
      loading: true
    });
    let component = this;

    let promise = new SyncService(this.state.apiKey, this.state.userUuid)
      .sync(this.state.dump);

    promise
      .then(
        result => {
          if (result.success) {
            component.setState({
                uploadCompleted: "Sync completed",
                dump: result.dump,
                loading: false
              }
            );
            this.props.expenseRepository.loadDump(result.dump);
          } else {
            component.setState({
                uploadFailed: "Failed to sync. Reason: " + result.reason,
                loading: false
              }
            );
          }
        })
  }

  downloadExpenses() {
    let component = this;
    let promise = fetch(
      `${API_ENDPOINT}/sync/${this.state.userUuid}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'X-Api-Key': this.state.apiKey,
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
          <button
            className='expense-form-submit button'
            onClick={this.uploadExpenses.bind(this)}>
            Sync expenses
          </button>

          <div className={this.state.uploadCompleted ? "" : "hide"}>
            <div className="callout success">
              <p>{this.state.uploadCompleted}</p>
            </div>
          </div>
          <div className={this.state.uploadFailed ? "" : "hide"}>
            <div className="callout alert">
              <p>{this.state.uploadFailed}</p>
            </div>
          </div>

          <div className={this.state.loading ? "lds-dual-ring" : "hide"}/>

        </div>

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

      </div>
    );
  }

  getAmount(categoryBudget) {
    return this.state.remainingAmounts.get(categoryBudget.categoryId);
  }
}

export default AdminDash;
