import mongoose from "mongoose";
const { Schema } = mongoose;

export const servicesSchema = new Schema(
    {
        alias: String,
        title: String,
        parent_aliases: [String],
        country_whitelist: [String],
        country_blacklist: [String],
    },
    { collection: "yelp_categories" }
);
