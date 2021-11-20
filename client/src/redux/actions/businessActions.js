import * as types from "../actionTypes/businessTypes";

export const businessDealsRequest = () => {
    return {
        type: types.BUSINESS_DEALS_REQUEST,
    };
};

export const businessDealsSuccess = (deals) => {
    return {
        type: types.BUSINESS_DEALS_REQUEST_SUCCESS,
        deals,
    };
};

export const businessDealsFailure = (error) => {
    return {
        type: types.BUSINESS_DEALS_REQUEST_FAILURE,
        error,
    };
};

export const businessesRequest = () => {
    return {
        type: types.BUSINESSES_REQUEST,
    };
};

export const businessesSuccess = (businesses) => {
    return {
        type: types.BUSINESSES_REQUEST_SUCCESS,
        businesses,
    };
};

export const businessesFailure = (error) => {
    return {
        type: types.BUSINESSES_REQUEST_FAILURE,
        error,
    };
};

export const getBusinessByServiceType = (serviceType, searchLocation) => {
    return {
        type: types.GET_BUSINESSES_BY_SERVICE_TYPE,
        data: {
            serviceType,
            searchLocation,
        },
    };
};

export const setFilter = (filterType, filterValue) => {
    return {
        type: types.SET_FILTER,
        data: {
            filterType,
            filterValue,
        },
    };
};

export const resetFilter = (serviceType, searchLocation) => {
    return {
        type: types.RESET_FILTER,
        data: {
            serviceType,
            searchLocation,
        },
    };
};

export const filterBusinesses = () => {
    return {
        type: types.FILTER_BUSINESSES,
    };
};
