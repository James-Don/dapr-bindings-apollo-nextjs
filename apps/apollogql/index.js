const { ApolloServer, gql } = require('apollo-server');
const UsersAPI = require('./apis/users-api')
const PostsAPI = require('./apis/posts-api')
const CommentsAPI = require('./apis/comments-api')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    id: ID!
    name: String!
    username: String!
    email: String
    posts: [Post]
  }

  type Post {
    userId: Int!  
    id: ID!
    title: String!
    body: String
  }

  type Comment {
    postId: Int!
    id: ID!
    name: String!
    email: String
    body: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    user(id: ID!): User
    users: [User]
    post(id: ID!): Post
    posts(userId: Int!): [Post]
    comments(postId: Int!): [Comment]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        user: async (_, { id }, { dataSources }) => {
            return dataSources.usersAPI.getUser(id);
        },
        users: async (_, { id }, { dataSources }) => {
            return dataSources.usersAPI.getUsers();
        },        
        post: async (_, { id }, { dataSources }) => {
            return dataSources.postsAPI.getPost(id);
        },
        posts: async (_, { userId }, { dataSources }) => {
            return dataSources.postsAPI.getPosts(userId);
        },        
        comments: async (_, { postId }, { dataSources }) => {
            return dataSources.commentsAPI.getComments(postId);
        },
    },
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, dataSources: () => ({
    usersAPI: new UsersAPI(),
    postsAPI: new PostsAPI(),
    commentsAPI: new CommentsAPI()
  }), });

// The `listen` method launches a web server.
server.listen(4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});