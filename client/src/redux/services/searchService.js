import client from "../../graphql/client";
import { YelpQuery } from "../../graphql";

export const filterBusinessesByCityOrZipcode = async ({ city, zipcode }) => {
    console.log(city, zipcode);
    let businesses = [];
    if (zipcode && zipcode != "") {
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
