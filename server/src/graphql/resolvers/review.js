import { LookupReviews, Reviews } from "../../db/mongo";

export default {
    Query: {
        getYelpReviews: async (parent, { business_id }) => {
            return await Reviews.find({ business_id });
        },
        getLookupReviews: async (parent, { business_id }) => {
            return await LookupReviews.find({ business_id });
        },
        addLookupReview: async (parent, review) => {
            return await LookupReviews.insertOne(review);
        },
        updateLookupReview: async (parent, review) => {
            const doc = LookupReviews.find({ id: review.id });
            return await LookupReviews.updateOne({ _id: doc._id, review });
        },
        deleteLookupReview: async (parent, { id }, { models }) => {
            return await LookupReviews.deleteOne({ id });
        },
    },
};
