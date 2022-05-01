const { RESTDataSource } = require('apollo-datasource-rest');
// Example REST data source
// const baseURL = 'https://jsonplaceholder.typicode.com/';
// local DAPR HTTP binding data source
const baseURL = 'http://127.0.0.1:3500/v1.0/bindings/jsonbinding'

class PersonalizationAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = baseURL
  }
  // Adapto to DAPR binding request
  willSendRequest(request) {
    request.headers.set('dapr-app-id', 'apollogql');
    request.method = 'POST'
    request.body = {
      "operation": "get",
      "metadata": {
        "path": request.path
      }
    }
    request.path = ''
  }
  }
module.exports = { PersonalizationAPI, baseURL }
