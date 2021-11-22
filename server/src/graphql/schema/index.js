import { gql } from "apollo-server-express";

import userSchema from "./user";
import orderSchema from "./order";
import businessSchema from "./business";
import reviewSchema from "./review";
import eventSchema from "./event";
import serviceSchema from "./service";
import searchLogSchema from "./searchLog";

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

export default [
    linkSchema,
    userSchema,
    orderSchema,
    businessSchema,
    reviewSchema,
    eventSchema,
    serviceSchema,
    searchLogSchema,
];
