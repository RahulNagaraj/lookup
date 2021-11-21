import * as types from "../actionTypes/businessTypes";

export const initialState = {
    isFetching: false,
    deals: [],
    businesses: [],
    filteredBusinesses: [],
    reviews: [],
    filters: {
        rating: "",
        reviewCount: "",
        isOpenNow: "",
        category: "",
        zipcode: "",
    },
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

const setFilters = (state, filterType, filterValue) => {
    return {
        ...state.filters,
        [filterType]: filterValue,
    };
};

const filterBusinesses = (state) => {
    const { filters, filteredBusinesses } = state;
    let businesses = [...filteredBusinesses];

    Object.keys(filters).forEach((key) => {
        if (key === "zipcode" && filters[key] !== "") {
            businesses = businesses.filter(
                (business) => business.location.zip_code === filters[key]
            );
        }
        if (key === "isOpenNow" && filters[key] !== "") {
            businesses = businesses.filter((business) => {
                if (filters[key] === "all") return true;
                return business.hours[0].is_open_now === Boolean(filters[key]);
            });
        }
        if (key === "rating" && filters[key] !== "") {
            if (filters[key] === "highest") {
                businesses = businesses.filter(
                    (business) => business.rating === 5
                );
            } else if (filters[key] === "lowest") {
                businesses = businesses.filter(
                    (business) => business.rating === 1
                );
            } else {
                businesses = businesses.filter(
                    (business) => business.rating >= 3
                );
            }
        }
        if (key === "reviewCount" && filters[key] !== "") {
            if (filters[key] === "highest") {
                businesses = businesses.filter(
                    (business) => business.review_count > 100
                );
            } else if (filters[key] === "lowest") {
                businesses = businesses.filter(
                    (business) => business.review_count <= 50
                );
            } else {
                businesses = businesses.filter(
                    (business) =>
                        business.review_count > 50 &&
                        business.review_count <= 100
                );
            }
        }
    });

    return businesses;
};

const addNewReview = (state, review) => {
    const reviews = [...state.reviews, review];
    return reviews;
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

        case types.GET_BUSINESSES_BY_SERVICE_TYPE: {
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
        }

        case types.SET_FILTER:
            const { filterType, filterValue } = action.data;
            const filters = setFilters(state, filterType, filterValue);
            return {
                ...state,
                filters,
            };

        case types.FILTER_BUSINESSES: {
            const filteredBusinesses = filterBusinesses(state);
            return {
                ...state,
                filteredBusinesses,
            };
        }

        case types.RESET_FILTER: {
            const { serviceType, searchLocation } = action.data;
            const filteredBusinesses = filterBusinessByServiceType(
                state,
                serviceType,
                searchLocation
            );
            return {
                ...state,
                filters: {
                    ...initialState.filters,
                },
                filteredBusinesses,
            };
        }

        case types.REVIEWS_REQUEST: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case types.REVIEWS_REQUEST_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                reviews: action.reviews,
            };
        }

        case types.REVIEWS_REQUEST_FAILURE: {
            return {
                ...state,
                isFetching: false,
                reviews: [],
            };
        }

        case types.ADD_REVIEW_REQUEST: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case types.ADD_REVIEW_REQUEST_SUCCESS: {
            const reviews = addNewReview(state, action.review);
            return {
                ...state,
                isFetching: false,
                reviews,
            };
        }

        case types.ADD_REVIEW_REQUEST_FAILURE: {
            return {
                ...state,
                isFetching: false,
            };
        }

        default:
            return state;
    }
};
