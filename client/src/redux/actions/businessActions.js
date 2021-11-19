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

export const businessesSuccess = (deals) => {
    return {
        type: types.BUSINESSES_REQUEST_SUCCESS,
        deals,
    };
};

export const businessesFailure = (error) => {
    return {
        type: types.BUSINESSES_REQUEST_FAILURE,
        error,
    };
};
