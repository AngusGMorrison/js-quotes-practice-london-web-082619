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
      this.createDeleteButton(),
      this.createEditButton()
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
    button.addEventListener("click", event =>
      LikeController.likeQuote(event, this)
    );
    return button;
  }

  createDeleteButton() {
    const button = document.createElement("button");
    button.classList.add("btn-danger");
    button.textContent = "Delete";
    button.addEventListener("click", (event) =>
      QuoteController.destroyQuote(event, this)
    );
    return button;
  }

  createEditButton() {
    const button = document.createElement("button");
    button.classList.add("btn-secondary", "edit");
    button.textContent = "Edit";
    button.addEventListener("click", (event) =>
      QuoteController.editQuote(event, this)
    );
    return button;
  }

  createEditForm() {
    const form = document.createElement("form");
    form.classList.add("edit-quote-form");
    form.addEventListener("submit", event => {
      QuoteController.submitQuoteChanges(event, this)
    });
    form.append(
      this.createEditFormTextField(),
      this.createEditFormSaveButton(),
      this.createEditFormCancelButton()
    );
    return form;
  }

  createEditFormTextField() {
    const textField = document.createElement("textarea");
    textField.value = this.content;
    return textField;
  }

  createEditFormSaveButton() {
    const saveButton = document.createElement("input");
    saveButton.type = "submit"
    saveButton.classList.add("btn-primary");
    saveButton.textContent = "Save changes";
    return saveButton;
  }

  createEditFormCancelButton() {
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("btn-secondary");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", QuoteController.cancelEditQuote);
    return cancelButton;
  }

}