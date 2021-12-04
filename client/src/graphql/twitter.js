import { gql } from "@apollo/client";

const GET_TWITTER_MATCHES = gql`
    query twitterMatches {
        twitterMatches
    }
`;

export default {
    GET_TWITTER_MATCHES,
};
