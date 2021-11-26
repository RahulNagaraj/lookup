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

export const reviews = async (business_id) => {
    const reviews = await client.query({
        query: YelpQuery.GET_ALL_REVIEWS,
        variables: { business_id },
    });

    return reviews.data.reviews;
};

export const addReview = async (review) => {
    const reviews = await client.mutate({
        mutation: YelpQuery.ADD_REVIEW,
        variables: { review },
    });

    return reviews.data.review;
};

export const deleteReview = async ({ id, businessId }) => {
    const reviews = await client.mutate({
        mutation: YelpQuery.DELETE_REVIEW,
        variables: { id, business_id: businessId },
    });

    return reviews.data.reviews;
};
