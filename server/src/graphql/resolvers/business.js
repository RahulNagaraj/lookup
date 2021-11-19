import { Businesses, Deals } from "../../db/mongo";

export default {
    Query: {
        getAllBusiness: async () => {
            return await Businesses.find();
        },
        getBusiness: async (parent, { id }, { models }) => {
            return await Businesses.findOne({ id });
        },
        getBusinessDeals: async () => {
            return await Deals.find({}, null, { limit: 20 });
        },
    },
};
