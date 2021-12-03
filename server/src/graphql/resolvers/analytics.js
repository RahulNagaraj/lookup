var neo4j = require("neo4j-driver");

import { LookupReviews, Businesses } from "../../db/mongo";

const driver = neo4j.driver(
    "bolt://neo4j:7687",
    neo4j.auth.basic("neo4j", "root"),
    { disableLosslessIntegers: true }
);

const months = [
    {
        key: 0,
        value: "January",
    },
    {
        key: 1,
        value: "February",
    },
    {
        key: 2,
        value: "March",
    },
    {
        key: 3,
        value: "April",
    },
    {
        key: 4,
        value: "May",
    },
    {
        key: 5,
        value: "June",
    },
    {
        key: 6,
        value: "July",
    },
    {
        key: 7,
        value: "August",
    },
    {
        key: 8,
        value: "September",
    },
    {
        key: 9,
        value: "October",
    },
    {
        key: 10,
        value: "November",
    },
    {
        key: 11,
        value: "December",
    },
];

export default {
    Query: {
        noOfRequestsPerYear: async (parent, { year }, { models }) => {
            const orders = await models.Order.findAll({ raw: true });
            const array = [];

            months.forEach((month) => {
                const o = orders.filter((order) => {
                    const { orderDate } = order;
                    const dateObj = new Date(orderDate);
                    const orderedMonth = dateObj.getMonth();

                    return month["key"] === orderedMonth;
                });

                array.push({ name: month["value"], y: o.length });
            });

            return array;
        },

        typeOfRequests: async (parent, args, { models }) => {
            const orders = await models.Order.findAll({ raw: true });
            const res = {};

            orders.forEach((order) => {
                const { serviceType } = order;
                if (res[serviceType]) res[serviceType] = res[serviceType] + 1;
                else res[serviceType] = 1;
            });

            const response = Object.keys(res).map((key) => ({
                name: key,
                y: res[key],
            }));

            return response;
        },

        zipcodeVsNoOfRequests: async (parent, args, { models }) => {
            const orders = await models.Order.findAll({ raw: true });
            const res = {};
            const response = [];

            orders.forEach((order) => {
                const { address } = order;
                const [street, city, state] = address.split(", ");
                const [st, zipcode] = address.split(" - ");

                if (res[zipcode]) res[zipcode] = res[zipcode] + 1;
                else res[zipcode] = 1;
            });

            Object.keys(res).forEach((key) => {
                response.push({ name: key, y: res[key] });
            });

            return response;
        },

        cityVsTypeOfRequests: async (parent, args, { models }) => {
            const orders = await models.Order.findAll({ raw: true });
            const serviceTypes = [
                ...new Set(orders.map((order) => order.serviceType)),
            ];
            const series = [];
            const types = {};

            serviceTypes.forEach((serviceType) => {
                types[serviceType] = {};
                const cities = {};
                orders.forEach((order) => {
                    const { address } = order;
                    const [street, city, state] = address.split(", ");

                    if (serviceType === order.serviceType) {
                        cities[city] = cities[city] ? cities[city] + 1 : 1;
                    }

                    types[serviceType] = cities;
                });
            });

            const array = [];
            Object.values(types).forEach((type) => {
                array.push(...Object.keys(type).map((t) => t));
            });

            const cities = [...new Set(array)];

            cities.forEach((city) => {
                const obj = {
                    name: city,
                    data: [],
                };
                Object.keys(types).forEach((typeKey) => {
                    const type = types[typeKey];
                    obj["data"].push(type[city] ? type[city] : 0);
                });
                series.push(obj);
            });

            const res = {
                serviceTypes,
                series,
            };

            return res;
        },

        topRatedBusinesses: async (parent, args, { models }) => {
            const reviews = await LookupReviews.find(
                { rating: { $eq: 5 } },
                null,
                {
                    limit: 10,
                }
            );

            const businessesSet = new Set();
            const businesses = [];

            reviews.forEach((review) => {
                const { business_id } = review;
                businessesSet.add(business_id);
            });

            console.log(businessesSet);

            businessesSet.forEach((id) => {
                const business = Businesses.findOne({ id });
                businesses.push(business);
            });

            return businesses;
        },

        recommendedServices: async (parent, { city }, { models }) => {
            const businesses = await Businesses.find({
                "location.city": city,
                rating: 5,
            }).sort({ reviewCount: -1 });

            let businessesObject = {};

            businesses.forEach((business) => {
                const titles = business.categories.map(
                    (category) => category.title
                );

                titles.forEach((title) => {
                    if (businessesObject[title]) {
                        businessesObject[title] = [
                            ...businessesObject[title],
                        ].concat(business);
                    } else {
                        businessesObject[title] = [].concat(business);
                    }
                });
            });

            const recommendedServices = Object.keys(businessesObject)
                .slice(0, 5)
                .reduce((result, key) => {
                    result[key] = businessesObject[key];

                    return result;
                }, {});

            return recommendedServices;
        },

        topInfluentialBusinesses: async () => {
            const session = driver.session({
                database: "neo4j",
                defaultAccessMode: neo4j.session.READ,
            });
            const query = `
                MATCH (n:User) - [r:\`Requested Services From\`] -> (b:Business) 
                RETURN b AS business, COUNT(*) AS count 
                ORDER BY toInteger(count) DESC LIMIT 10
            `;

            let results = await session.run(query);
            const businesses = results.records.map((record) => {
                const obj = {
                    business: record.get("business")["properties"],
                    count: record.get("count"),
                };
                return obj;
            });

            return businesses;
        },

        topInfluentialPeople: async () => {
            const session = driver.session({
                database: "neo4j",
                defaultAccessMode: neo4j.session.READ,
            });
            const query = `
                MATCH (n:User) - [r:Reviewed] -> (x) 
                RETURN n as user, COUNT(*) AS count 
                ORDER BY count DESC LIMIT 10
            `;

            let results = await session.run(query);
            const people = results.records.map((record) => {
                const obj = {
                    user: record.get("user")["properties"],
                    count: record.get("count"),
                };
                return obj;
            });

            return people;
        },

        topInfluentialCommunity: async () => {
            const session = driver.session({
                database: "neo4j",
                defaultAccessMode: neo4j.session.READ,
            });
            const query = `
                MATCH (z:Zipcode) - [r:Has] -> (e:Event) 
                RETURN z.zipcode AS zipcode, COUNT(*) as count 
                ORDER BY count DESC LIMIT 10
            `;

            let results = await session.run(query);
            const community = results.records.map((record) => {
                const obj = {
                    zipcode: record.get("zipcode"),
                    count: record.get("count"),
                };
                return obj;
            });

            return community;
        },
    },
};
