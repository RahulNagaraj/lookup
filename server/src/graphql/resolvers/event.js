import { Events } from "../../db/mongo";

export default {
    Query: {
        getAllEvents: async (parent, args, { models }) => {
            return await Events.find({});
        },
        getEventsByLocation: async (parent, { city }, { models }) => {
            return await Events.find({
                "location.city": { $regex: new RegExp(city, "i") },
            });
        },
    },
};
