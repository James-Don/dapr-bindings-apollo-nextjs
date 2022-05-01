const { PersonalizationAPI } = require('./personization-api')

class PostsAPI extends PersonalizationAPI {
    constructor() {
      super();
    }
  
    async getPost(id) {
      return this.get(
        `posts/${encodeURIComponent(id)}`
      );
    }
    
    async getPosts(userId) {
        return this.get(
          `users/${encodeURIComponent(userId)}/posts`
        );
      }
  
  }

  module.exports = PostsAPI