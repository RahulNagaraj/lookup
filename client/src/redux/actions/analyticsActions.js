import * as types from "../actionTypes/analyticsTypes";

export const noOfRequestsPerYearRequest = (year) => {
    return {
        type: types.NUMBER_OF_REQUESTS_PER_YEAR_REQUEST,
        year,
    };
};

export const noOfRequestsPerYearSuccess = (data) => {
    return {
        type: types.NUMBER_OF_REQUESTS_PER_YEAR_REQUEST_SUCCESS,
        data,
    };
};

export const noOfRequestsPerYearError = (error) => {
    return {
        type: types.NUMBER_OF_REQUESTS_PER_YEAR_REQUEST_FAILURE,
        error,
    };
};

export const typeOfRequestsRequest = () => {
    return {
        type: types.TYPE_OF_SERVICE_REQUESTS_REQUEST,
    };
};

export const typeOfRequestsSuccess = (data) => {
    return {
        type: types.TYPE_OF_SERVICE_REQUESTS_REQUEST_SUCCESS,
        data,
    };
};

export const typeOfRequestsError = (error) => {
    return {
        type: types.TYPE_OF_SERVICE_REQUESTS_REQUEST_FAILURE,
        error,
    };
};

export const zipcodeVsNoOfRequestsRequest = () => {
    return {
        type: types.ZIPCODE_VS_NUMBER_OF_REQUESTS_REQUEST,
    };
};

export const zipcodeVsNoOfRequestsSuccess = (data) => {
    return {
        type: types.ZIPCODE_VS_NUMBER_OF_REQUESTS_REQUEST_SUCCESS,
        data,
    };
};

export const zipcodeVsNoOfRequestsError = (error) => {
    return {
        type: types.ZIPCODE_VS_NUMBER_OF_REQUESTS_REQUEST_FAILURE,
        error,
    };
};

export const cityVsTypeOfRequestsRequest = () => {
    return {
        type: types.CITY_VS_TYPE_OF_SERVICE_REQUESTS_REQUEST,
    };
};

export const cityVsTypeOfRequestsSuccess = (data) => {
    return {
        type: types.CITY_VS_TYPE_OF_SERVICE_REQUESTS_REQUEST_SUCCESS,
        data,
    };
};

export const cityVsTypeOfRequestsError = (error) => {
    return {
        type: types.CITY_VS_TYPE_OF_SERVICE_REQUESTS_REQUEST_FAILURE,
        error,
    };
};

export const topRatedServicesRequest = () => {
    return {
        type: types.TOP_RATED_SERVICES_REQUEST,
    };
};

export const topRatedServicesSuccess = (data) => {
    return {
        type: types.TOP_RATED_SERVICES_REQUEST_SUCCESS,
        data,
    };
};

export const topRatedServicesError = (error) => {
    return {
        type: types.TOP_RATED_SERVICES_REQUEST_FAILURE,
        error,
    };
};

export const recommendedServicesRequest = (city) => {
    return {
        type: types.RECOMMENDED_SERVICES_REQUEST,
        city,
    };
};

export const recommendedServicesSuccess = (services) => {
    return {
        type: types.RECOMMENDED_SERVICES_REQUEST_SUCCESS,
        services,
    };
};

export const recommendedServicesError = (error) => {
    return {
        type: types.RECOMMENDED_SERVICES_REQUEST_FAILURE,
        error,
    };
};

export const resetRecommendedServices = () => {
    return {
        type: types.RESET_RECOMMENDED_SERVICES
    }
}
