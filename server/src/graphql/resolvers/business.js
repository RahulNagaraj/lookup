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
            return await Deals.find({}, null, { limit: 5 });
        },
        filterBusinessesByCity: async (parent, { city }, { models }) => {
            return await Businesses.find({ "location.city": city });
        },
        filterBusinessesByZipcode: async (parent, { zipcode }, { models }) => {
            return await Businesses.find({ "location.zip_code": zipcode });
        },
    },
};
