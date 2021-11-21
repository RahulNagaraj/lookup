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
