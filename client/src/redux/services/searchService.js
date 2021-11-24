import client from "../../graphql/client";
import { YelpQuery, SearchLogQuery } from "../../graphql";

export const filterBusinessesByCityOrZipcode = async ({ city, zipcode }) => {
    let businesses = [];
    if (zipcode && zipcode !== "") {
        businesses = await client.query({
            query: YelpQuery.FILTER_BUSINESSES_BY_ZIPCODE,
            variables: { zipcode },
        });
    } else {
        businesses = await client.query({
            query: YelpQuery.FILTER_BUSINESSES_BY_CITY,
            variables: { city },
        });
    }

    return businesses.data.businesses;
};

export const setSearchLogCityEntry = async ({ userId, searchCity }) => {
    console.log(userId, searchCity);
    const result = await client.mutate({
        mutation: SearchLogQuery.ADD_SEARCH_LOG_CITY_ENTRY,
        variables: { searchLog: { userId, searchCity } },
    });
};

export const setSearchLogZipcodeEntry = async ({ userId, searchZipcode }) => {
    const result = await client.mutate({
        mutation: SearchLogQuery.ADD_SEARCH_LOG_ZIPCODE_ENTRY,
        variables: { searchLog: { userId, searchZipcode } },
    });
};

export const setSearchLogBusinessCityEntry = async ({
    userId,
    businessCity,
}) => {
    const result = await client.mutate({
        mutation: SearchLogQuery.ADD_SEARCH_LOG_BUSINESS_CITY_ENTRY,
        variables: { searchLog: { userId, businessCity } },
    });
};

export const setSearchLogBusinessZipcodeEntry = async ({
    userId,
    businessZipcode,
}) => {
    const result = await client.mutate({
        mutation: SearchLogQuery.ADD_SEARCH_LOG_BUSINESS_ZIPCODE_ENTRY,
        variables: { searchLog: { userId, businessZipcode } },
    });
};
