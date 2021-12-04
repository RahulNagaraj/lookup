import { takeEvery, call, put, all } from "redux-saga/effects";

import * as types from "../actionTypes/twitterTypes";
import * as service from "../services/twitterService";
import * as actions from "../actions/twitterActions";

function* twitterMatches() {
    try {
        const twitterMatches = yield call(service.twitterMatches);
        yield put(actions.twitterMatchesSuccess(twitterMatches));
    } catch (e) {
        yield put(
            actions.twitterMatchesFailure("Error fetching twitter deals!")
        );
    }
}

function* watchTwitterMatches() {
    yield takeEvery(types.TWITTER_MATCHES_REQUEST, twitterMatches);
}

export function* twitterSaga() {
    yield all([watchTwitterMatches()]);
}
