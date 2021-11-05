import { GraphQLDateTime } from "graphql-iso-date";

import userResolvers from "./user";
import orderResolvers from "./order";

const customScalarResolver = {
    Date: GraphQLDateTime,
};

export default [customScalarResolver, userResolvers, orderResolvers];
