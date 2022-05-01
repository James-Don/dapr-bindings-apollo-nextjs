const { PersonalizationAPI } = require('./personization-api')

class CommentsAPI extends PersonalizationAPI {
    constructor() {
      super();
    }
  
    async getComments(postId) {
      return this.get(
        `post/${encodeURIComponent(postId)}/comments`
      );
    }
  
  }

  module.exports = CommentsAPI