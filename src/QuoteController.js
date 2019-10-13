class QuoteController {

  static init() {
    QuoteController.bindEventListeners();
    QuoteController.addAllQuotesToPage();
  }

  static bindEventListeners() {
    const submitButton = document.querySelector(".btn-primary");
    submitButton.addEventListener("click", QuoteController.submitQuote);
  }

  static addAllQuotesToPage() {
    const quoteList = document.querySelector("#quote-list")
    //QuoteController.clearElement(quoteList);
    Adapter.getAllQuotes()
      .then(quoteRecords => {
        quoteRecords.forEach(quoteRecord => {
          const quote = new Quote(quoteRecord);
          quoteList.append(quote.createCard());
        });
      })
      .catch(console.log);
  }

  // static clearElement(element) {
  //   while (element.hasChildNodes()) {
  //     element.lastChild.remove();
  //   }
  // }

  static submitQuote(event) {
    event.preventDefault();
    const content = document.querySelector("#new-quote");
    const author = document.querySelector("#author");
    if (content.value !== "" && author.value !== "") {
      Adapter.postQuote(content.value, author.value)
        .then(quoteRecord => QuoteController.addNewQuoteToPage(quoteRecord))
        .catch(console.log);
    } else {
      alert("Both fields are required.")
    }
    content.textContent = "";
    author.textContent = "";
  }

  static addNewQuoteToPage(quoteRecord) {
    const quoteList = document.querySelector("#quote-list")
    const quote = new Quote(quoteRecord);
    quoteList.append(quote.createCard());
  }

}