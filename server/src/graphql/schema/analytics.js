import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        noOfRequestsPerYear(year: Int!): JSON!
        zipcodeVsNoOfRequests: JSON!
        typeOfRequests: JSON!
        topRatedBusinesses: [Business]!
        cityVsTypeOfRequests: JSON!
        recommendedServices(city: String!): JSON!
    }

    type RequestsPerYear {
        year: RequestMonthData
    }

    type RequestMonthData {
        month: RequestData
    }

    type RequestData {
        name: String
        value: Int
    }
`;
