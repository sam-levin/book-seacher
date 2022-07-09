const { gql } = require('apollo-server-express');

const typeDefs = gql`


type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  type Auth {
     token: ID!
     user: User
  }


  type User {
    _id: String!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String! 
    authors: [String!]
    description: String!
    title: String!

  }
`
  

module.exports = typeDefs;