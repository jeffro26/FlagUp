import axios from "axios";

const baseURL = "/rest";

export class Client {
  constructor() {
    const baseConfig = this._defaultConfig();
    this.config = baseConfig;
    this.http = this.newHttp();
  }

  _defaultConfig() {
    return {
      baseURL
    };
  }

  newHttp() {
    const http = axios.create(this.config);
    return http;
  }
  async _get(url, data = {}) {
    try {
      const response = await this.http.get(url);
      return response.data;
    } catch (err) {
      window.alert(err);
      throw err;
    }
  }
}

const client = new Client();

export default client;
