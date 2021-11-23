import client from "../../graphql/client";
import { YelpQuery } from "../../graphql";

export const events = async (userId) => {
    const events = await client.query({
        query: YelpQuery.GET_EVENTS_BY_USER_ID,
        variables: { userId },
    });

    return events.data.events;
};
