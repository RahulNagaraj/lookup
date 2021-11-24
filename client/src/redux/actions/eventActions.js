import * as types from "../actionTypes/eventTypes";

export const eventsRequest = (userId) => {
    return {
        type: types.EVENTS_REQUEST,
        userId,
    };
};

export const eventsSuccess = (events) => {
    return {
        type: types.EVENTS_REQUEST_SUCCESS,
        events,
    };
};

export const eventsFailure = (error) => {
    return {
        type: types.EVENTS_REQUEST_FAILURE,
        error,
    };
};

export const setFilterType = (type, value) => {
    return {
        type: types.SET_FILTER_TYPE,
        data: {
            type,
            value,
        },
    };
};

export const resetFilter = () => {
    return {
        type: types.RESET_EVENT_FILTER,
    };
};
