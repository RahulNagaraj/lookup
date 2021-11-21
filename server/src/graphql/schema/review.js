import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getYelpReviews(business_id: ID!): [Review]!
        getLookupReviews(business_id: ID!): [Review]!
        getAllReviews(business_id: ID!): [Review]!
    }

    extend type Mutation {
        addLookupReview(review: ReviewInput!): Review!
        updateLookupReview(id: ID!, review: ReviewInput!): Review!
        deleteLookupReview(id: ID!): Boolean!
    }

    type Review {
        _id: ID
        business_id: String
        text: String
        time_created: String
        rating: String
        user: ReviewUser
    }

    type ReviewUser {
        id: String
        profile_url: String
        image_url: String
        name: String
    }

    input ReviewInput {
        business_id: String
        text: String
        time_created: String
        rating: String
        user: ReviewUserInput
    }

    input ReviewUserInput {
        name: String
    }
`;
