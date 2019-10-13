class Adapter {

  static getAllQuotes() {
    return fetch("http://localhost:3000/quotes?_embed=likes")
      .then(response => response.json())
      .catch(console.log);
  }

  static postQuote(content, author) {
    const quote = {
      quote: content,
      author: author
    }
    const config = Adapter.createRequestConfig("POST", quote)

    return fetch("http://localhost:3000/quotes", config)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("HTTP response code " + response.status);
        }
      })
      .catch(console.log);
  }

  static postLike(quoteId, timestamp) {
    const like = {
      quoteId: quoteId,
      createdAt: timestamp
    }
    const config = Adapter.createRequestConfig("POST", like);

    return fetch("http://localhost:3000/likes", config)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("HTTP response code " + response.status);
        }
      })
      .catch(console.log);
  }

  static createRequestConfig(method, body) {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }
  }
}