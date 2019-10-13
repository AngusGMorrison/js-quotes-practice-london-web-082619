class LikeAdapter extends Adapter {

  static postLike(quoteId, timestamp) {
    const like = {
      quoteId: quoteId,
      createdAt: timestamp
    }
    const config = LikeAdapter.createRequestConfigWithBody("POST", like);

    return fetch("http://localhost:3000/likes", config)
      .then(response => LikeAdapter.validateResponse(response));
  }
  
}