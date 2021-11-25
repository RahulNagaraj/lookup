import { gql } from "@apollo/client";
import { BUSINESS_FRAGMENT } from "./fragment";

const NUMBER_OF_REQUESTS_PER_YEAR = gql`
    query noOfRequestsPerYear($year: Int!) {
        data: noOfRequestsPerYear(year: $year)
    }
`;

const TYPE_OF_REQUESTS = gql`
    query typeOfRequests {
        data: typeOfRequests
    }
`;

const ZIPCODE_VS_NUMBER_OF_REQUESTS = gql`
    query zipcodeVsNoOfRequests {
        data: zipcodeVsNoOfRequests
    }
`;

const CITY_VS_TYPE_OF_SERVICE_REQUESTS = gql`
    query cityVsTypeOfRequests {
        data: cityVsTypeOfRequests
    }
`;

const TOP_RATED_SERVICES = gql`
    ${BUSINESS_FRAGMENT}
    query topRatedServices {
        data: topRatedServices {
            ...businessFragment
        }
    }
`;

export default {
    NUMBER_OF_REQUESTS_PER_YEAR,
    TYPE_OF_REQUESTS,
    CITY_VS_TYPE_OF_SERVICE_REQUESTS,
    TOP_RATED_SERVICES,
    ZIPCODE_VS_NUMBER_OF_REQUESTS,
};
