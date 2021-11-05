import { gql } from "apollo-server-express";
const { GraphQLDateTime } = require("graphql-iso-date");

import userSchema from "./user";
import orderSchema from "./order";

const linkSchema = gql`
    scalar Date
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;

export default [linkSchema, userSchema, orderSchema];
