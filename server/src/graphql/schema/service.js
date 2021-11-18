import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getServices: [Service!]!
    }

    type Service {
        alias: String
        title: String
        parent_aliases: [String]
        country_whitelist: [String]
        country_blacklist: [String]
    }
`;
