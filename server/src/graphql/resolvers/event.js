import { Events } from "../../db/mongo";

const eventsByCity = async (city) => {
    const events = await Events.find({
        "location.city": { $regex: new RegExp(city, "i") },
    });
    return events;
};

const eventsByZipcode = async (zipcode) => {
    const events = await Events.find({
        "location.zip_code": zipcode,
    });
    return events;
};

export default {
    Query: {
        getAllEvents: async (parent, args, { models }) => {
            return await Events.find({});
        },
        getEventsByCity: async (parent, { city }, { models }) => {
            return await Events.find({
                "location.city": { $regex: new RegExp(city, "i") },
            });
        },
        getEventsByZipcode: async (parent, { zipcode }, { models }) => {
            return await Events.find({
                "location.zip_code": zipcode,
            });
        },
        getEventsByUserId: async (parent, { userId }, { models }) => {
            const searchHistory = await models.SearchLog.viewSearchLogByUserId(
                userId
            );
            const orders = await models.Order.viewOrderByUserId(userId);

            const merged = [];
            const unique = new Set();
            const events = [];
            const eventObject = {};

            searchHistory.forEach((history) => {
                merged.push(history);
            });

            orders.forEach((order) => {
                merged.push(order);
            });

            merged.forEach((data) => {
                if (data["searchCity"]) unique.add(data["searchCity"]);
                else if (data["searchZipcode"])
                    unique.add(data["searchZipcode"]);
                else if (data["businessCity"]) unique.add(data["businessCity"]);
                else if (data["businessZipcode"])
                    unique.add(data["businessZipcode"]);
                else if (data["address"]) {
                    const [address, city, state] = data["address"].split(", ");
                    const [s, zipcode] = state.split(" - ");
                    unique.add(city);
                    unique.add(zipcode);
                }
            });

            const uniqueList = [...unique];

            for (let index = 0; index < uniqueList.length; index++) {
                const element = uniqueList[index];
                if (isNaN(element)) {
                    const e = await eventsByCity(element);
                    events.push(...e);
                } else {
                    const e = await eventsByZipcode(element);
                    events.push(...e);
                }
            }

            events.forEach((event) => {
                const eventId = event["id"];
                if (!eventObject[eventId]) {
                    eventObject[eventId] = event;
                }
            });

            return Object.values(eventObject);
        },
    },
};
