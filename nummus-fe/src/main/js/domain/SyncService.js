let API_ENDPOINT = "https://t2zbab4l06.execute-api.eu-central-1.amazonaws.com/Prod";

class SyncService {

  constructor(apiKey, userUuid) {
    this._apiKey = apiKey;
    this._userUuid = userUuid;
  }

  sync(dump) {
    return fetch(
      `${API_ENDPOINT}/sync/${this._userUuid}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'X-Api-Key': this._apiKey,
        },
        body: dump,
      }
    ).then(response => response.json())
      .then(response => {
          if (Array.isArray(response)) {
            let jsonResponse = JSON.stringify(response);
            return {
              dump: jsonResponse,
              success: true
            };
          }

          return {
            dump: JSON.stringify(response.allExpenses),
            deletedExpenses: JSON.stringify(response.deletedExpenses),
            newExpenses: JSON.stringify(response.newExpenses),
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

export default SyncService;
