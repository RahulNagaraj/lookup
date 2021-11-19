import * as types from "../actionTypes/businessTypes";

export const initialState = {
    isFetching: false,
    deals: [],
    businesses: [],
    error: "",
};

export const businessesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.BUSINESS_DEALS_REQUEST:
        case types.BUSINESSES_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.BUSINESS_DEALS_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: "",
                deals: action.deals,
            };
        case types.BUSINESS_DEALS_REQUEST_FAILURE:
            return {
                ...state,
                deals: [],
                error: action.error,
            };
        case types.BUSINESSES_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: "",
                businesses: action.businesses,
            };
        case types.BUSINESSES_REQUEST_FAILURE:
            return {
                ...state,
                businesses: [],
                error: action.error,
            };

        default:
            return state;
    }
};
