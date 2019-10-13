class QuoteController {

  static init() {
    QuoteController.bindEventListeners();
    QuoteController.addAllQuotesToPage();
  }

  static bindEventListeners() {
    const submitButton = document.querySelector(".btn-primary");
    submitButton.addEventListener("click", QuoteController.submitQuote);
    const sortDropdown = document.querySelector("select");
    sortDropdown.addEventListener("change", QuoteController.addAllQuotesToPage)
  }

  static addAllQuotesToPage() {
    const quoteList = document.querySelector("#quote-list")
    const sortColumn = document.querySelector("select").value;
    QuoteController.clearElement(quoteList);
    QuoteAdapter.getAllQuotes(sortColumn)
      .then(quoteRecords => {
        quoteRecords.forEach(quoteRecord => {
          const quote = new Quote(quoteRecord);
          quoteList.append(quote.createCard());
        });
      })
      .catch(console.log);
  }

  static clearElement(element) {
    while (element.hasChildNodes()) {
      element.lastChild.remove();
    }
  }

  static submitQuote(event) {
    event.preventDefault();
    const content = document.querySelector("#new-quote");
    const author = document.querySelector("#author");
    if (content.value !== "" && author.value !== "") {
      QuoteAdapter.postQuote(content.value, author.value)
        .then(quoteRecord => QuoteController.addNewQuoteToPage(quoteRecord))
        .catch(console.log);
    } else {
      alert("Both fields are required.")
    }
    content.value = "";
    author.value = "";
  }

  static addNewQuoteToPage(quoteRecord) {
    const quoteList = document.querySelector("#quote-list")
    const quote = new Quote(quoteRecord);
    quoteList.append(quote.createCard());
  }

  static destroyQuote(event, quote) {
    const quoteCard = event.target.parentNode.parentNode;
    QuoteAdapter.destroyQuote(quote.id)
      .then(() => quoteCard.remove())
      .catch(console.log);
  }

  static editQuote(event, quote) {
    QuoteController.toggleEditButtonsLock();
    const editForm = quote.createEditForm();
    event.target.parentNode.appendChild(editForm);
  }

  static toggleEditButtonsLock() {
    const editButtons = document.querySelectorAll(".edit");
    [...editButtons].forEach(button => {
      button.disabled = !button.disabled;
    });
  }

  static submitQuoteChanges(event, quote) {
    event.preventDefault();
    const quoteCard = event.target.parentNode.parentNode;
    const inputValue = event.target.firstChild.value
    if (inputValue === "") {
      alert("Quote cannot be blank");
    } else {
      quote.content = inputValue;
      QuoteAdapter.patchQuote(quote)
        .then(() => {
          QuoteController.refreshQuoteCard(quoteCard, quote);
        })
        .catch(console.log);
    }
  }

  static refreshQuoteCard(quoteCard, quote) {
    const quoteList = document.querySelector("#quote-list");
    quoteList.replaceChild(quote.createCard(), quoteCard);
  }

  static cancelEditQuote(event) {
    event.preventDefault();
    event.target.parentNode.remove();
    QuoteController.toggleEditButtonsLock();
  }

}