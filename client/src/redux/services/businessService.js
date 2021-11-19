import client from "../../graphql/client";
import { YelpQuery } from "../../graphql";

export const businessDeals = async () => {
    const deals = await client.query({
        query: YelpQuery.GET_BUSINESS_DEALS,
    });

    return deals.data.deals;
};

export const businesses = async () => {
    const services = await client.query({
        query: YelpQuery.GET_SERVICES,
    });

    return services.data.services;
};
