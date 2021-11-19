import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getAllBusiness: [Business]!
        getBusiness(id: ID!): Business
        getBusinessDeals: [Business]!
    }

    type Business {
        id: ID
        alias: String
        name: String
        image_url: String
        is_claimed: Boolean
        is_closed: Boolean
        url: String
        phone: String
        display_phone: String
        review_count: Int
        categories: [Categories]
        rating: Float
        location: Location
        coordinates: Coordinates
        photos: [String]
        hours: [Hours]
        transactions: [String]
        messaging: Messaging
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
        cross_streets: String
    }

    type Hours {
        hours_type: String
        is_open_now: Boolean
        open: [OpenHours]
    }

    type OpenHours {
        is_overnight: Boolean
        start: String
        end: String
        day: Int
    }

    type Messaging {
        url: String
        use_case_text: String
    }
`;
