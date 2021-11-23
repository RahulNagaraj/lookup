import * as types from "../actionTypes/eventTypes";

export const initialState = {
    isFetching: false,
    events: [],
    error: "",
    filters: {
        category: "",
        attendingCount: "",
        free: "",
    },
    filteredEvents: [],
};

const filterEvents = (state, type, value) => {
    const filters = {
        ...state.filters,
        [type]: value,
    };

    let filteredEvents = [...state.filteredEvents];

    Object.keys(filters).forEach((key) => {
        const data = filters[key];
        if (key === "category" && data != "") {
            filteredEvents = filteredEvents.filter(
                (event) => event.category === filters[key]
            );
        }
        if (key === "attendingCount" && data != "") {
            if (data === "lowest") {
                filteredEvents = filteredEvents.filter(
                    (event) =>
                        event.attending_count >= 0 &&
                        event.attending_count <= 49
                );
            } else if (data === "highest") {
                filteredEvents = filteredEvents.filter(
                    (event) =>
                        event.attending_count >= 50 &&
                        event.attending_count < 100
                );
            } else {
                filteredEvents = filteredEvents.filter(
                    (event) => event.attending_count > 100
                );
            }
        }
        if (key === "free" && data != "") {
            if (data === "free") {
                filteredEvents = filteredEvents.filter(
                    (event) => event.is_free
                );
            } else if (data === "cancelled") {
                filteredEvents = filteredEvents.filter(
                    (event) => event.is_canceled
                );
            } else {
                filteredEvents = filteredEvents.filter(
                    (event) => event.is_official
                );
            }
        }
    });

    return filteredEvents;
};

export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EVENTS_REQUEST:
            return {
                ...initialState,
                isFetching: true,
            };

        case types.EVENTS_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: "",
                events: action.events,
                filteredEvents: action.events,
            };
        case types.EVENTS_REQUEST_FAILURE:
            return {
                ...initialState,
                error: action.error,
            };

        case types.SET_FILTER_TYPE:
            const {
                data: { type, value },
            } = action;
            const filteredEvents = filterEvents(state, type, value);
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [type]: value,
                },
                filteredEvents,
            };

        default:
            return state;
    }
};
