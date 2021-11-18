import * as types from "../actionTypes/userTypes";

export const initialState = {
    isFetching: false,
    userDetails: {},
    error: "",
    isLoggedIn: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGNUP_REQUEST:
        case types.SIGNIN_REQUEST:
            return {
                ...initialState,
                isFetching: true,
            };

        case types.SIGNUP_REQUEST_SUCCESS:
        case types.SIGNIN_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: "",
                userDetails: action.user.user,
                isLoggedIn: true,
            };
        case types.SIGNUP_REQUEST_FAILURE:
        case types.SIGNIN_REQUEST_FAILURE:
            return {
                ...initialState,
                error: action.error,
            };
        case types.LOGOUT_REQUEST:
            return {
                ...state,
            };

        case types.LOGOUT_REQUEST_SUCCESS:
            return {
                ...initialState,
                isLoggedIn: false,
            };
        case types.LOGOUT_REQUEST_FAILURE:
            return {
                ...initialState,
                isLoggedIn: false,
                error: action.error,
            };

        default:
            return state;
    }
};
