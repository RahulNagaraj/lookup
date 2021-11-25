import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        users: [User!]
        user(id: ID!): User
        me: User
    }
    extend type Mutation {
        signUp(
            firstName: String!
            lastName: String!
            email: String!
            password: String!
            role: String
        ): AuthData!
        signIn(email: String!, password: String!): AuthData!
        deleteUser(id: ID!): Boolean!
    }
    type AuthData {
        user: User!
        token: String!
    }
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        role: String
    }
`;
