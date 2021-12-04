import * as types from "../actionTypes/twitterTypes";

export const twitterMatchesRequest = () => {
    return {
        type: types.TWITTER_MATCHES_REQUEST,
    };
};

export const twitterMatchesSuccess = (twitter) => {
    return {
        type: types.TWITTER_MATCHES_REQUEST_SUCCESS,
        twitter,
    };
};

export const twitterMatchesFailure = (error) => {
    return {
        type: types.TWITTER_MATCHES_REQUEST_FAILURE,
        error,
    };
};
