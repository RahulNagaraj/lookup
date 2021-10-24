import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from '../resolvers/user';

const customScalarResolver = {
    Date: GraphQLDateTime,
};

export default [customScalarResolver, userResolvers];
