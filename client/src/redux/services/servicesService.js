import client from "../../graphql/client";
import { YelpQuery } from "../../graphql";

export const services = async () => {
    const services = await client.query({
        query: YelpQuery.GET_SERVICES,
    });

    return services.data.services;
};
