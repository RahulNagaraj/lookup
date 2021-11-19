import mongoose from "mongoose";
const { Schema } = mongoose;

export const businessDealsSchema = new Schema(
    {
        id: String,
        alias: String,
        name: String,
        image_url: String,
        is_claimed: Boolean,
        is_closed: Boolean,
        url: String,
        phone: String,
        display_phone: String,
        review_count: Number,
        categories: [],
        rating: Number,
        location: {
            address1: String,
            address2: String,
            address3: String,
            city: String,
            zip_code: String,
            country: String,
            state: String,
            display_address: [String],
            cross_streets: String,
        },
        coordinates: {
            latitude: Number,
            longitude: Number,
        },
        photos: [String],
        hours: [],
        transactions: [],
        messaging: {
            url: String,
            use_case_text: String,
        },
    },
    { collection: "yelp_deals" }
);
