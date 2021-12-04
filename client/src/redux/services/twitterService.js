import client from "../../graphql/client";
import { TwitterQuery } from "../../graphql";

export const twitterMatches = async () => {
    const twitterMatches = await client.query({
        query: TwitterQuery.GET_TWITTER_MATCHES,
    });

    return twitterMatches.data.twitterMatches;
};
