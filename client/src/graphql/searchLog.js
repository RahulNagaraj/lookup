import { gql } from "@apollo/client";

const ADD_SEARCH_LOG_CITY_ENTRY = gql`
    mutation addSearchLogCityEntry($searchLog: SearchLogCityInput!) {
        addSearchLogCityEntry(searchLog: $searchLog)
    }
`;

const ADD_SEARCH_LOG_ZIPCODE_ENTRY = gql`
    mutation addSearchLogZipcodeEntry($searchLog: SearchLogZipcodeInput!) {
        addSearchLogZipcodeEntry(searchLog: $searchLog)
    }
`;

const ADD_SEARCH_LOG_BUSINESS_CITY_ENTRY = gql`
    mutation addSearchLogBusinessCityEntry(
        $searchLog: SearchLogBusinessCityInput!
    ) {
        addSearchLogBusinessCityEntry(searchLog: $searchLog)
    }
`;

const ADD_SEARCH_LOG_BUSINESS_ZIPCODE_ENTRY = gql`
    mutation addSearchLogBusinessZipcodeEntry(
        $searchLog: SearchLogBusinessZipcodeInput!
    ) {
        addSearchLogBusinessZipcodeEntry(searchLog: $searchLog)
    }
`;

export default {
    ADD_SEARCH_LOG_CITY_ENTRY,
    ADD_SEARCH_LOG_ZIPCODE_ENTRY,
    ADD_SEARCH_LOG_BUSINESS_CITY_ENTRY,
    ADD_SEARCH_LOG_BUSINESS_ZIPCODE_ENTRY,
};
