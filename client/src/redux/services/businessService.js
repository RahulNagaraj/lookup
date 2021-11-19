import client from "../../graphql/client";
import { YelpQuery } from "../../graphql";

export const businessDeals = async () => {
    const deals = await client.query({
        query: YelpQuery.GET_BUSINESS_DEALS,
    });

    return deals.data.deals;
};

export const businesses = async () => {
    const business = await client.query({
        query: YelpQuery.GET_ALL_BUSINESSES,
    });

    return business.data.businesses;
};
