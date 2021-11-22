import { takeEvery, call, put, all } from "redux-saga/effects";

import * as types from "../actionTypes/searchTypes";
import * as service from "../services/searchService";
import * as actions from "../actions/searchActions";

function* filterSearchBusinesses({ data }) {
    try {
        const businesses = yield call(
            service.filterBusinessesByCityOrZipcode,
            data
        );
        yield put(actions.filterBusinessesSearchSuccess(businesses));
    } catch (e) {
        yield put(
            actions.filterBusinessesSearchFailure("Error fetching businesses!")
        );
    }
}

function* watchFilterSearchBusinesses() {
    yield takeEvery(
        types.FILTER_BUSINESSES_SEARCH_REQUEST,
        filterSearchBusinesses
    );
}

export function* searchSaga() {
    yield all([watchFilterSearchBusinesses()]);
}
