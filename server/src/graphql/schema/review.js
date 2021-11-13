import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getReviews(business_id: ID!): [Review]!
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
