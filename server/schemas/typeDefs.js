
const typeDefs = `
type Book {
_id: ID!
authors: [String]
description: String!
bookId: String!
image: String
link: String
title: String!
},
type User {
_id: ID!
username: String!
email: String!
password: String!
bookCount: Int
savedBooks: [Book]
},
type Auth {
token: ID!
user: User
},
type Query {
    me: User
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: String!): Book
    
}

type Mutation {

    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String], description: String, bookId: String, image: String, link: String, title: String): User
    removeBook(bookId: String): User
}

`


module.exports = typeDefs;