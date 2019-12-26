let API_ENDPOINT = "https://hi6kvr95o9.execute-api.us-east-1.amazonaws.com/prod";

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
          return {
            dump: JSON.stringify(response),
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