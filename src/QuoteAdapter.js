class QuoteAdapter extends Adapter {

  static getAllQuotes() {
    return fetch("http://localhost:3000/quotes?_embed=likes")
      .then(response => QuoteAdapter.validateResponse(response));
  }

  static postQuote(content, author) {
    const quote = {
      quote: content,
      author: author
    }
    const config = QuoteAdapter.createRequestConfigWithBody("POST", quote)
    return fetch("http://localhost:3000/quotes", config)
      .then(response => QuoteAdapter.validateResponse(response));
  }

  static destroyQuote(quoteId) {
    const config = QuoteAdapter.createBaseRequestConfig("DELETE");
    return fetch(`http://localhost:3000/quotes/${quoteId}`, config)
      .then(response => QuoteAdapter.validateResponse(response));
  }

}