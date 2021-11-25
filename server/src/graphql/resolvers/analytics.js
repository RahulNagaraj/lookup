import { LookupReviews, Businesses } from "../../db/mongo";

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

        topRatedServices: async (parent, args, { models }) => {
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
    },
};
