const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(body: savedBooks! ): User
    deleteBook( bookId: ID! ): User
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
    _id: ID!
    bookId: String! 
    authors: [String!]
    description: String!
    title: String!
    link: String
    image: String
  }

  input savedBooks {
      bookId: String!
      authors: [String]
      description: String
      image: String
      link: String
      title: String
    }
`
  

module.exports = typeDefs;