import mongoose from "mongoose";
const { Schema } = mongoose;

export const reviewsSchema = new Schema(
    {
        business_id: String,
        id: String,
        text: String,
        time_created: String,
        url: String,
        rating: Number,
        user: {
            id: String,
            profile_url: String,
            image_url: String,
            name: String,
        },
    },
    { collection: "yelp_reviews" }
);
