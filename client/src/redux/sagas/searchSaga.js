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

function* setSearchLogCityEntry({ data }) {
    try {
        yield call(service.setSearchLogCityEntry, data);
    } catch (e) {}
}

function* setSearchLogZipcodeEntry({ data }) {
    try {
        yield call(service.setSearchLogZipcodeEntry, data);
    } catch (e) {}
}

function* setSearchLogBusinessCityEntry({ data }) {
    try {
        yield call(service.setSearchLogBusinessCityEntry, data);
    } catch (e) {}
}

function* setSearchLogBusinessZipcodeEntry({ data }) {
    try {
        yield call(service.setSearchLogBusinessZipcodeEntry, data);
    } catch (e) {}
}

function* watchFilterSearchBusinesses() {
    yield takeEvery(
        types.FILTER_BUSINESSES_SEARCH_REQUEST,
        filterSearchBusinesses
    );
}

function* watchSetSearchLogCityEntry() {
    yield takeEvery(types.SET_SEARCH_LOG_CITY_ENTRY, setSearchLogCityEntry);
}

function* watchSetSearchLogZipcodeEntry() {
    yield takeEvery(
        types.SET_SEARCH_LOG_ZIPCODE_ENTRY,
        setSearchLogZipcodeEntry
    );
}

function* watchSetSearchLogBusinessCityEntry() {
    yield takeEvery(
        types.SET_SEARCH_LOG_BUSINESS_CITY_ENTRY,
        setSearchLogBusinessCityEntry
    );
}

function* watchSetSearchLogBusinessZipcodeEntry() {
    yield takeEvery(
        types.SET_SEARCH_LOG_BUSINESS_ZIPCODE_ENTRY,
        setSearchLogBusinessZipcodeEntry
    );
}

export function* searchSaga() {
    yield all([
        watchFilterSearchBusinesses(),
        watchSetSearchLogCityEntry(),
        watchSetSearchLogZipcodeEntry(),
        watchSetSearchLogBusinessCityEntry(),
        watchSetSearchLogBusinessZipcodeEntry(),
    ]);
}
