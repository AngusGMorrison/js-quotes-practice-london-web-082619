class QuoteAdapter extends Adapter {

  static getAllQuotes(sortColumn) {
    return fetch(`http://localhost:3000/quotes?_embed=likes&_sort=${sortColumn}`)
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

  static patchQuote(quote) {
    const updates = {
      quote: quote.content
    }
    const config = QuoteAdapter.createRequestConfigWithBody("PATCH", updates)
    return fetch(`http://localhost:3000/quotes/${quote.id}`, config)
      .then(response => QuoteAdapter.validateResponse(response));
  }

}