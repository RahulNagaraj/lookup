import * as types from "../actionTypes/userTypes";

export const initialState = {
    isFetching: false,
    userDetails: {},
    error: "",
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGNUP_REQUEST:
        case types.SIGNIN_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.SIGNUP_REQUEST_SUCCESS:
        case types.SIGNIN_REQUEST_SUCCESS:
            const token = action.user.token;
            const user = action.user.user;
            localStorage.setItem("token", token);
            return {
                ...state,
                isFetching: false,
                error: "",
                userDetails: user,
            };
        case types.SIGNUP_REQUEST_FAILURE:
        case types.SIGNIN_REQUEST_FAILURE:
            localStorage.setItem("token", "");
            return {
                ...initialState,
                error: action.error,
            };

        default:
            return state;
    }
};
