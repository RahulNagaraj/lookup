import * as types from "../actionTypes/searchTypes";

export const setSearchField = (type, value) => {
    return {
        type: types.SET_SEARCH_FIELD_REQUEST,
        data: {
            type,
            value,
        },
    };
};

export const filterBusinessesSearchRequest = (city, zipcode) => {
    return {
        type: types.FILTER_BUSINESSES_SEARCH_REQUEST,
        data: {
            city,
            zipcode,
        },
    };
};

export const filterBusinessesSearchSuccess = (businesses) => {
    return {
        type: types.FILTER_BUSINESSES_SEARCH_REQUEST_SUCCESS,
        businesses,
    };
};

export const filterBusinessesSearchFailure = (error) => {
    return {
        type: types.FILTER_BUSINESSES_SEARCH_REQUEST_FAILURE,
        error,
    };
};

export const setSearchLogCityEntry = (userId, searchCity) => {
    return {
        type: types.SET_SEARCH_LOG_CITY_ENTRY,
        data: {
            userId,
            searchCity,
        },
    };
};

export const setSearchLogZipcodeEntry = (userId, searchZipcode) => {
    return {
        type: types.SET_SEARCH_LOG_ZIPCODE_ENTRY,
        data: {
            userId,
            searchZipcode,
        },
    };
};

export const setSearchLogBusinessCityEntry = (userId, businessCity) => {
    return {
        type: types.SET_SEARCH_LOG_BUSINESS_CITY_ENTRY,
        data: {
            userId,
            businessCity,
        },
    };
};

export const setSearchLogBusinessZipcodeEntry = (userId, businessZipcode) => {
    return {
        type: types.SET_SEARCH_LOG_BUSINESS_ZIPCODE_ENTRY,
        data: {
            userId,
            businessZipcode,
        },
    };
};
