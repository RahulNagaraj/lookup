import { GraphQLDateTime } from "graphql-iso-date";
import { GraphQLJSON, GraphQLJSONObject } from "graphql-type-json";

import userResolvers from "./user";
import orderResolvers from "./order";
import businessResolvers from "./business";
import reviewResolvers from "./review";
import eventResolvers from "./event";
import serviceResolvers from "./service";
import searchLogResolvers from "./searchLog";
import analyticsResolvers from "./analytics";
import twitterResolvers from "./twitter";

const customScalarResolver = {
    Date: GraphQLDateTime,
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
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
    analyticsResolvers,
    twitterResolvers,
];
