import { Businesses } from "../../db/mongo";

export default {
    Query: {
        getAllBusiness: async (parent, args, { models }) => {
            return await Businesses.find();
        },
        getBusiness: async (parent, { id }, { models }) => {
            return await Businesses.findOne({ id });
        },
    },
};
