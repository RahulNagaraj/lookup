import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getAllEvents: [Event]!
        getEventsByCity(city: String!): [Event]!
        getEventsByZipcode(zipcode: Int!): [Event]!
        getEventsByUserId(userId: ID!): [Event]!
    }

    type Event {
        attending_count: Int
        category: String
        cost: Float
        cost_max: Float
        description: String
        event_site_url: String
        id: String
        image_url: String
        interested_count: Int
        is_canceled: Boolean
        is_free: Boolean
        is_official: Boolean
        latitude: Float
        longitude: Float
        name: String
        tickets_url: String
        time_end: String
        time_start: String
        location: EventLocation
        business_id: String
    }

    type EventLocation {
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
`;
