import { takeEvery, call, put, all } from "redux-saga/effects";

import * as types from "../actionTypes/userTypes";
import * as service from "../services/userService";
import * as actions from "../actions/userActions";

function* signUp({ creds }) {
    try {
        const user = yield call(service.signUp, creds);
        yield put(actions.signUpSuccess(user.data.signUp));
    } catch (e) {
        yield put(actions.signUpFailure("Error Signing Up!"));
    }
}

function* signIn({ creds }) {
    try {
        const user = yield call(service.signIn, creds);
        yield put(actions.signInSuccess(user.data.signIn));
    } catch (e) {
        yield put(actions.signInFailure("Error Signing In!"));
    }
}

function* logout() {}

function* watchSignIn() {
    yield takeEvery(types.SIGNIN_REQUEST, signIn);
}

function* watchSignUp() {
    yield takeEvery(types.SIGNUP_REQUEST, signUp);
}

function* watchLogoutUser() {
    yield takeEvery(types.LOGOUT_REQUEST, logout);
}

export function* userSaga() {
    yield all([watchSignIn(), watchSignUp(), watchLogoutUser]);
}
