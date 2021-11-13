import mongoose from "mongoose";
const { Schema } = mongoose;

export const businessSchema = new Schema(
    {
        id: String,
        alias: String,
        name: String,
        image_url: String,
        is_closed: Boolean,
        url: String,
        review_count: Number,
        categories: [{ alias: String, title: String }],
        rating: Number,
        coordinates: { latitude: Number, longitude: Number },
        transactions: [],
        location: {
            address1: String,
            address2: String,
            address3: String,
            city: String,
            zip_code: String,
            country: String,
            state: String,
            display_address: [String],
        },
        phone: String,
        display_phone: String,
        distance: Number,
    },
    { collection: "yelp_businesses" }
);
