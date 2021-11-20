import * as types from "../actionTypes/businessTypes";

export const initialState = {
    isFetching: false,
    deals: [],
    businesses: [],
    filteredBusinesses: [],
    error: "",
};

const filterBusinessByServiceType = (state, serviceType, searchLocation) => {
    const { businesses } = state;
    const filteredBusinesses = [];

    businesses.forEach((business) => {
        business.categories.forEach((category) => {
            if (
                category.alias === serviceType &&
                business.location.city === searchLocation
            ) {
                filteredBusinesses.push(business);
            }
        });
    });

    return filteredBusinesses;
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
                ...initialState,
                businesses: [],
                error: action.error,
            };

        case types.GET_BUSINESS_BY_SERVICE_TYPE:
            const { serviceType, searchLocation } = action.data;
            const filteredBusinesses = filterBusinessByServiceType(
                state,
                serviceType,
                searchLocation
            );
            return {
                ...state,
                filteredBusinesses,
            };

        default:
            return state;
    }
};
