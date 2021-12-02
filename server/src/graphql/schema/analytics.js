import { gql } from "apollo-server-express";

// Neo4j
// 1. MATCH (n:User) - [r:`Requested Services From`] -> (b:Business) RETURN b, COUNT(*) ORDER BY COUNT(*) DESC LIMIT 10
// 2. MATCH (n:User) - [r:Reviewed] -> (x) RETURN n, COUNT(*) ORDER BY COUNT(*) DESC LIMIT 10
// 3.
// 4. MATCH (z:Zipcode) - [r:`Has`] -> (e:Event) RETURN z.zipcode, COUNT(*) as count ORDER BY count DESC LIMIT 10

export default gql`
    extend type Query {
        noOfRequestsPerYear(year: Int!): JSON!
        zipcodeVsNoOfRequests: JSON!
        typeOfRequests: JSON!
        topRatedBusinesses: [Business]!
        cityVsTypeOfRequests: JSON!
        recommendedServices(city: String!): JSON!

        topInfluentialBusinesses: JSON!
        topInfluentialPeople: JSON!
        topInfluentialCommunity: JSON!
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
