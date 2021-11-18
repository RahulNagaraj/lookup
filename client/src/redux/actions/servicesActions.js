import * as types from "../actionTypes/servicesTypes";

export const servicesRequest = () => {
    return {
        type: types.SERVICES_REQUEST,
    };
};

export const servicesSuccess = (services) => {
    return {
        type: types.SERVICES_REQUEST_SUCCESS,
        services,
    };
};

export const servicesFailure = (error) => {
    return {
        type: types.SERVICES_REQUEST_FAILURE,
        error,
    };
};
