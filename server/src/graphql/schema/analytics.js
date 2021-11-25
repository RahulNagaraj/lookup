import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        noOfRequestsPerYear(year: Int!): JSON!
        zipcodeVsNoOfRequests: JSON!
        typeOfRequests: JSON!
        topRatedServices: [Business]!
        cityVsTypeOfRequests: JSON!
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
