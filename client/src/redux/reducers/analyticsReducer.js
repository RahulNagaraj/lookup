import * as types from "../actionTypes/analyticsTypes";

const initialState = {
    isFetching: false,
    data: [],
    error: "",
};

export const analyticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.NUMBER_OF_REQUESTS_PER_YEAR_REQUEST:
        case types.TYPE_OF_SERVICE_REQUESTS_REQUEST:
        case types.ZIPCODE_VS_NUMBER_OF_REQUESTS_REQUEST:
        case types.CITY_VS_TYPE_OF_SERVICE_REQUESTS_REQUEST:
        case types.TOP_RATED_SERVICES_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.NUMBER_OF_REQUESTS_PER_YEAR_REQUEST_SUCCESS:
        case types.TYPE_OF_SERVICE_REQUESTS_REQUEST_SUCCESS:
        case types.ZIPCODE_VS_NUMBER_OF_REQUESTS_REQUEST_SUCCESS:
        case types.CITY_VS_TYPE_OF_SERVICE_REQUESTS_REQUEST_SUCCESS:
        case types.TOP_RATED_SERVICES_REQUEST_SUCCESS:
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
            return {
                ...state,
                isFetching: false,
                data: [],
                error: action.error,
            };

        default:
            return {
                ...state,
            };
    }
};
