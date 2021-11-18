import * as types from "../actionTypes/userTypes";

export const signUpRequest = (creds) => {
    return {
        type: types.SIGNUP_REQUEST,
        creds,
    };
};

export const signUpSuccess = (user) => {
    return {
        type: types.SIGNUP_REQUEST_SUCCESS,
        user,
    };
};

export const signUpFailure = (error) => {
    return {
        type: types.SIGNUP_REQUEST_FAILURE,
        error,
    };
};

export const signInRequest = (creds) => {
    return {
        type: types.SIGNIN_REQUEST,
        creds,
    };
};

export const signInSuccess = (user) => {
    return {
        type: types.SIGNIN_REQUEST_SUCCESS,
        user,
    };
};

export const signInFailure = (error) => {
    return {
        type: types.SIGNIN_REQUEST_FAILURE,
        error,
    };
};

export const logoutRequest = () => {
    return {
        type: types.LOGOUT_REQUEST,
    };
};

export const logoutSuccess = () => {
    return {
        type: types.LOGOUT_REQUEST_SUCCESS,
    };
};

export const logoutFailure = (error) => {
    return {
        type: types.LOGOUT_REQUEST_FAILURE,
        error,
    };
};
