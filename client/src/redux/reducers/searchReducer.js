import * as types from "../actionTypes/searchTypes";

export const initialState = {
    isFetching: false,
    searchFields: {
        city: {
            key: "chicago",
            value: "Chicago",
            coordinates: {
                lat: 41.881832,
                lng: -87.623177,
            },
        },
        zipcode: "",
        searchText: "",
    },
    filteredBusinesses: [],
};

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SEARCH_FIELD_REQUEST:
            const { type, value } = action.data;
            return {
                ...state,
                searchFields: {
                    ...state.searchFields,
                    [type]: value,
                },
            };

        case types.FILTER_BUSINESSES_SEARCH_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.FILTER_BUSINESSES_SEARCH_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                filteredBusinesses: action.businesses,
            };

        case types.FILTER_BUSINESSES_SEARCH_REQUEST_FAILURE:
            return {
                ...state,
                isFetching: false,
                filteredBusinesses: [],
                error: action.error,
            };

        default:
            return state;
    }
};
