import * as types from "../actionTypes/analyticsTypes";

const initialState = {
    isFetching: false,
    data: [],
    recommendedServices: {},
    error: "",
};

export const analyticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.NUMBER_OF_REQUESTS_PER_YEAR_REQUEST:
        case types.TYPE_OF_SERVICE_REQUESTS_REQUEST:
        case types.ZIPCODE_VS_NUMBER_OF_REQUESTS_REQUEST:
        case types.CITY_VS_TYPE_OF_SERVICE_REQUESTS_REQUEST:
        case types.TOP_RATED_SERVICES_REQUEST:
        case types.MOST_INFLUENTIAL_BUSINESSES_REQUEST:
        case types.MOST_INFLUENTIAL_COMMUNITY_REQUEST:
        case types.MOST_INFLUENTIAL_PEOPLE_REQUEST:
            return {
                ...state,
                data: [],
                isFetching: true,
            };

        case types.NUMBER_OF_REQUESTS_PER_YEAR_REQUEST_SUCCESS:
        case types.TYPE_OF_SERVICE_REQUESTS_REQUEST_SUCCESS:
        case types.ZIPCODE_VS_NUMBER_OF_REQUESTS_REQUEST_SUCCESS:
        case types.CITY_VS_TYPE_OF_SERVICE_REQUESTS_REQUEST_SUCCESS:
        case types.TOP_RATED_SERVICES_REQUEST_SUCCESS:
        case types.MOST_INFLUENTIAL_BUSINESSES_REQUEST_SUCCESS:
        case types.MOST_INFLUENTIAL_COMMUNITY_REQUEST_SUCCESS:
        case types.MOST_INFLUENTIAL_PEOPLE_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data,
            };

        case types.NUMBER_OF_REQUESTS_PER_YEAR_REQUEST_FAILURE:
        case types.TYPE_OF_SERVICE_REQUESTS_REQUEST_FAILURE:
        case types.ZIPCODE_VS_NUMBER_OF_REQUESTS_REQUEST_FAILURE:
        case types.CITY_VS_TYPE_OF_SERVICE_REQUESTS_REQUEST_FAILURE:
        case types.TOP_RATED_SERVICES_REQUEST_FAILURE:
        case types.MOST_INFLUENTIAL_BUSINESSES_REQUEST_FAILURE:
        case types.MOST_INFLUENTIAL_COMMUNITY_REQUEST_FAILURE:
        case types.MOST_INFLUENTIAL_PEOPLE_REQUEST_FAILURE:
            return {
                ...state,
                isFetching: false,
                data: [],
                error: action.error,
            };

        case types.RECOMMENDED_SERVICES_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.RECOMMENDED_SERVICES_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                recommendedServices: action.services,
            };

        case types.RECOMMENDED_SERVICES_REQUEST_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error,
                recommendedServices: {},
            };

        case types.RESET_RECOMMENDED_SERVICES:
            return {
                ...state,
                recommendedServices: {},
            };

        default:
            return {
                ...state,
            };
    }
};
