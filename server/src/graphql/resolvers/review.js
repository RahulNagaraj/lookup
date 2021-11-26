import { LookupReviews, Reviews } from "../../db/mongo";

export default {
    Query: {
        getYelpReviews: async (parent, { business_id }) => {
            const yelpReviews = await Reviews.find({ business_id });
            const lookupReviews = await LookupReviews.find({ business_id });
            return [...yelpReviews];
        },
        getLookupReviews: async (parent, { business_id }) => {
            return await LookupReviews.find({ business_id });
        },
        getAllReviews: async (parent, { business_id }) => {
            const yelpReviews = await Reviews.find({ business_id });
            const lookupReviews = await LookupReviews.find({ business_id });
            return [...yelpReviews, ...lookupReviews];
        },
    },

    Mutation: {
        addLookupReview: async (parent, { review }) => {
            const newReview = new LookupReviews({ ...review });
            await newReview.save();

            return newReview;
        },
        updateLookupReview: async (parent, { id, review }) => {
            return await LookupReviews.findOneAndUpdate({ _id: id }, review, {
                upsert: true,
                returnOriginal: false,
            });
        },
        deleteLookupReview: async (parent, { id, business_id }, { models }) => {
            await LookupReviews.findByIdAndRemove(id);
            const yelpReviews = await Reviews.find({ business_id });
            const lookupReviews = await LookupReviews.find({ business_id });
            return [...yelpReviews, ...lookupReviews];
        },
    },
};
