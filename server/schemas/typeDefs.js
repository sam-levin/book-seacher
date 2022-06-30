const { gql } = require('apollo-server-express');

const typeDefs = gql`


type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savebook(PUT STUFF HERE!!!)
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
  }

  type removeBook {
    ACCEPTS bookID AS PARAMETER, RETURNS [USER]
  }

  type User {
    _id: String!
    username: String!
    email: String!
    bookCount: int
    savedBooks: [Book]
  }

  type Book {
    bookId: String! - THIS WILL BE RETURNED FROM GOOGLE BOOKS API
    authors: [String!]
    description: String!
    title: String!
    image: 
    link:
  }

  
`

module.exports = typeDefs;