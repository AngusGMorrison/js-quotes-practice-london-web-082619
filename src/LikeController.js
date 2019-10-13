class LikeController {

  static likeQuote(event, quote) {
    const likeCountSpan = event.target.firstElementChild;
    const timestamp = LikeController.createTimestamp();
    LikeAdapter.postLike(quote.id, timestamp)
      .then(() => {
        quote.likes++;
        likeCountSpan.textContent = quote.likes;
      })
      .catch(console.log);
  }

  static createTimestamp() {
    return Math.floor(Date.now() / 1000);
  }

}