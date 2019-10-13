class Adapter {

  static validateResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("HTTP status code " + response.status);
    }
  }
  
  static createRequestConfigWithBody(method, body) {
    const config = Adapter.createBaseRequestConfig(method);
    config.body = JSON.stringify(body);
    return config;
  }
  
  static createBaseRequestConfig(method) {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
  }
  
}