import { TwitterDeals } from "../../db/mongo";

export default {
    Query: {
        twitterMatches: async () => {
            return await TwitterDeals.find({}).limit(5);
        },
    },
};
