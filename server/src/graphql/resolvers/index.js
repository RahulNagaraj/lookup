import { GraphQLDateTime } from "graphql-iso-date";

import userResolvers from "./user";
import orderResolvers from "./order";
import businessResolvers from "./business";
import reviewResolvers from "./review";
import eventResolvers from "./event";
import serviceResolvers from "./service";
import searchLogResolvers from "./searchLog";

const customScalarResolver = {
    Date: GraphQLDateTime,
};

export default [
    customScalarResolver,
    userResolvers,
    orderResolvers,
    businessResolvers,
    reviewResolvers,
    eventResolvers,
    serviceResolvers,
    searchLogResolvers,
];
