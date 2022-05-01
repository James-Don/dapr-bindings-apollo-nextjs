
const { PersonalizationAPI } = require('./personization-api')

class UsersAPI extends PersonalizationAPI {
    constructor() {
      super();
    }
  
    async getUser(id) {
      let user = this.get(
        `users/${encodeURIComponent(id)}`
      );
      let posts = this.get(
        `/users/${encodeURIComponent(id)}/posts`
      );
      let resolved = await Promise.all([user, posts])
      let allData = resolved[0]
      // allData.data = {}
      allData.posts = resolved[1]
      return Promise.resolve(allData)
    }
    
    async getUsers() {
        return this.get(
          `users`
        );
      }
  
  }

  module.exports = UsersAPI