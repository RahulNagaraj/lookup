import { Services } from "../../db/mongo";

export default {
    Query: {
        getServices: async (parent, args, { models }) => {
            return await Services.find();
        },
    },
};
