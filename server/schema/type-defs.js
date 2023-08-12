const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearPublish: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: UsersResult
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  input CreateUser {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = ISKANDAR
  }

  input updateUserName {
    id: ID!
    newUserName: String!
  }

  type Mutation {
    createUser(input: CreateUser!): User
    updateUserName(input: updateUserName!): User
    deleteUser(id: ID!): User
  }

  enum Nationality {
    CANADA
    CHELSEA
    MIAMI
    ISKANDAR
    ALASKA
  }

  type usersSucessResult {
    users: [User!]!
  }

  type UserErrorResult {
    message: String!
  }

  union UsersResult = usersSucessResult | UserErrorResult
`;

module.exports = { typeDefs };
