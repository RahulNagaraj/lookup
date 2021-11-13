import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getAllBusiness: [Business]!
        getBusiness(id: ID!): Business
    }

    type Business {
        id: ID
        alias: String
        name: String
        image_url: String
        is_closed: Boolean
        url: String
        review_count: Int
        categories: [Categories]
        rating: Int
        coordinates: Coordinates
        location: Location
        phone: String
        display_phone: String
        distance: Float
    }

    type Categories {
        alias: String
        title: String
    }

    type Coordinates {
        latitude: Float
        longitude: Float
    }

    type Location {
        address1: String
        address2: String
        address3: String
        city: String
        zip_code: String
        country: String
        state: String
        display_address: [String]
    }
`;
