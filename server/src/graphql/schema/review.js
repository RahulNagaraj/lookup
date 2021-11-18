import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getYelpReviews(business_id: ID!): [Review]!
        getLookupReviews(business_id: ID!): [Review]!
        addLookupReview(review: ID!): [Review!]!
        updateLookupReview(review: ID!): [Review!]!
        deleteLookupReview(id: ID!): Boolean!
    }

    type Review {
        id: ID
        business_id: String
        text: String
        time_created: String
        url: String
        rating: Int
        user: ReviewUser
    }

    type ReviewUser {
        id: String
        profile_url: String
        image_url: String
        name: String
    }
`;
