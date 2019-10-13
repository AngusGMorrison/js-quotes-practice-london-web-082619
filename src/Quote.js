class Quote {

  constructor(quoteRecord) {
    this.id = quoteRecord.id;
    this.content = quoteRecord.quote;
    this.author = quoteRecord.author;
    this.likes = quoteRecord.likes ? quoteRecord.likes.length : 0
  }

  createCard() {
    const card = document.createElement("li");
    card.classList.add("quote-card");
    card.append(this.createBlockquote());
    return card;
  }

  createBlockquote() {
    const blockquote = document.createElement("blockquote");
    blockquote.classList.add("blockquote")
    blockquote.append(
      this.createContentPara(),
      this.createFooter(),
      this.createLikeButton(),
      this.createDeleteButton()
    );
    return blockquote;
  }

  createContentPara() {
    const contentPara = document.createElement("p");
    contentPara.classList.add("mb-0");
    contentPara.textContent = this.content;
    return contentPara;
  }

  createFooter() {
    const footer = document.createElement("footer");
    footer.classList.add("blockquote-footer");
    footer.textContent = this.author;
    return footer;
  }

  createLikeButton() {
    const button = document.createElement("button");
    button.classList.add("btn-success");
    button.innerHTML = `Likes: <span>${this.likes}</span>`
    button.addEventListener("click", (event) =>
      QuoteController.likeQuote(event, this)
    );
    return button;
  }

  createDeleteButton() {
    const button = document.createElement("button");
    button.classList.add("btn-danger");
    button.textContent = "Delete";
    button.addEventListener("click", () =>
      QuoteController.deleteQuote(this)
    );
    return button;
  }

}