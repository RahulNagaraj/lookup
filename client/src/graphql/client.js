import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import config from "../common/config";

const client = new ApolloClient({
    link: new HttpLink({ uri: config.GRAPHQL_URL }),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export default client;
