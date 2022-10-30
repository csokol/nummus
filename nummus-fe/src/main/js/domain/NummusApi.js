// const API_ENDPOINT = "https://nummus-v2.fly.dev";
const API_ENDPOINT = "http://localhost:8080";

class NummusApi {

  constructor(userUuid) {
    this._userUuid = userUuid;
  }

  save(expense) {
    let expenseJson = JSON.stringify(expense);

    return fetch(
      `${API_ENDPOINT}/expenses`,
      {
        method: 'POST',
        body: expenseJson,
        headers: {
          'X-Nummus-User-Uuid': this._userUuid,
          'Content-Type': 'application/json',
        },
      }
    ).then(response => response.json())
      .then(response => {
          return {
            success: true
          };
        }, reason => {
          return {
            success: false,
            reason: reason
          }
        }
      );
  }
}

export default NummusApi;
