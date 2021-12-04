import * as types from "../actionTypes/twitterTypes";

export const initialState = {
    isFetching: false,
    twitterMatches: [],
    error: "",
};

export const twitterMatchesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TWITTER_MATCHES_REQUEST:
            return {
                ...initialState,
                isFetching: true,
            };

        case types.TWITTER_MATCHES_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: "",
                twitterMatches: action.twitter,
            };
        case types.TWITTER_MATCHES_REQUEST_FAILURE:
            return {
                ...initialState,
                error: action.error,
            };

        default:
            return state;
    }
};
