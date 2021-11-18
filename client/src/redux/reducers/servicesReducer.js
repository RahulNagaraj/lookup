import * as types from "../actionTypes/servicesTypes";

export const initialState = {
    isFetching: false,
    services: [],
    error: "",
};

export const servicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SERVICES_REQUEST:
            return {
                ...initialState,
                isFetching: true,
            };

        case types.SERVICES_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: "",
                services: action.services,
            };
        case types.SERVICES_REQUEST_FAILURE:
            return {
                ...initialState,
                error: action.error,
            };

        default:
            return state;
    }
};
