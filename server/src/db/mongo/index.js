import mongoose from "mongoose";
import { businessSchema } from "./schema/business";
import { reviewsSchema } from "./schema/review";
import { eventsSchema } from "./schema/event";
import { lookupReviewsSchema } from "./schema/lookup_review";
import { servicesSchema } from "./schema/service";
import { businessDealsSchema } from "./schema/business_deals";
import { twitterDealsSchema } from "./schema/twitter_deals";

// docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" lookup-mongodb
const mongoDBURI =
    "mongodb://lookup:lookup@mongodb:27017/lookup?authSource=admin";

mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async function () {
    console.log("MongoDB Connected successfully");
});

const Businesses = mongoose.model("Businesses", businessSchema);
const Reviews = mongoose.model("Reviews", reviewsSchema);
const Events = mongoose.model("Events", eventsSchema);
const Services = mongoose.model("Services", servicesSchema);
const Deals = mongoose.model("Deals", businessDealsSchema);
const LookupReviews = mongoose.model("LookupReviews", lookupReviewsSchema);
const TwitterDeals = mongoose.model("TwitterDeals", twitterDealsSchema);

export {
    Businesses,
    Reviews,
    Events,
    Services,
    Deals,
    LookupReviews,
    TwitterDeals,
};
