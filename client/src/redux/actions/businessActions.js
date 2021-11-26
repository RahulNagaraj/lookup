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

export const getBusinessByServiceType = (serviceType, zipcode, city) => {
    return {
        type: types.GET_BUSINESSES_BY_SERVICE_TYPE,
        data: {
            serviceType,
            zipcode,
            city,
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

export const resetFilter = (serviceType, zipcode, city) => {
    return {
        type: types.RESET_FILTER,
        data: {
            serviceType,
            zipcode,
            city,
        },
    };
};

export const filterBusinesses = () => {
    return {
        type: types.FILTER_BUSINESSES,
    };
};

export const reviewsRequest = (business_id) => {
    return {
        type: types.REVIEWS_REQUEST,
        business_id,
    };
};

export const reviewsSuccess = (reviews) => {
    return {
        type: types.REVIEWS_REQUEST_SUCCESS,
        reviews,
    };
};

export const reviewsFailure = (error) => {
    return {
        type: types.REVIEWS_REQUEST_FAILURE,
        error,
    };
};

export const addReviewRequest = (review) => {
    return {
        type: types.ADD_REVIEW_REQUEST,
        review,
    };
};

export const addReviewSuccess = (review) => {
    return {
        type: types.ADD_REVIEW_REQUEST_SUCCESS,
        review,
    };
};

export const addReviewFailure = (error) => {
    return {
        type: types.ADD_REVIEW_REQUEST_FAILURE,
        error,
    };
};

export const resetReviews = () => {
    return {
        type: types.RESET_REVIEWS,
    };
};

export const deleteReviewRequest = (id, businessId) => {
    return {
        type: types.DELETE_REVIEW_REQUEST,
        data: {
            id,
            businessId,
        },
    };
};

export const deleteReviewSuccess = (reviews) => {
    return {
        type: types.DELETE_REVIEW_REQUEST_SUCCESS,
        reviews,
    };
};

export const deleteReviewFailure = (error) => {
    return {
        type: types.DELETE_REVIEW_REQUEST_FAILURE,
        error,
    };
};
