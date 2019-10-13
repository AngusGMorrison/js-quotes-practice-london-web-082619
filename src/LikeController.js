class LikeController {

  static likeQuote(quote) {
    const likeCount = document.querySelector("button span");
    const timestamp = LikeController.createTimestamp();
    Adapter.postLike(quote.id, timestamp)
      .then(() => {
        quote.likes++;
        likeCount.textContent = quote.likes;
      })
      .catch(console.log);
  }

  static createTimestamp() {
    return Math.floor(Date.now() / 1000);
  }

}