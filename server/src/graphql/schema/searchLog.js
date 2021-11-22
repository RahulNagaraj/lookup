import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getSearchLogByUserId(userId: String!): [SearchLog]!
    }

    extend type Mutation {
        addSearchLogCityEntry(searchLog: SearchLogCityInput!): Boolean!
        addSearchLogZipcodeEntry(searchLog: SearchLogZipcodeInput!): Boolean!
        addSearchLogBusinessCityEntry(
            searchLog: SearchLogBusinessCityInput!
        ): Boolean!
        addSearchLogBusinessZipcodeEntry(
            searchLog: SearchLogBusinessZipcodeInput!
        ): Boolean!
    }

    input SearchLogCityInput {
        userId: ID!
        searchCity: String!
    }

    input SearchLogZipcodeInput {
        userId: ID!
        searchZipcode: String!
    }

    input SearchLogBusinessCityInput {
        userId: ID!
        businessCity: String!
    }

    input SearchLogBusinessZipcodeInput {
        userId: ID!
        businessZipcode: String!
    }

    type SearchLog {
        userId: ID!
        searchCity: String
        searchZipcode: String
        businessCity: String
        businessZipcode: String
    }
`;
