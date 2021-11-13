import { Reviews } from "../../db/mongo";

export default {
    Query: {
        getReviews: async (parent, { business_id }, { models }) => {
            return await Reviews.find({ business_id });
        },
    },
};
