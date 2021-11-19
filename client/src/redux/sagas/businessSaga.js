import { takeEvery, call, put, all } from "redux-saga/effects";

import * as types from "../actionTypes/businessTypes";
import * as service from "../services/businessService";
import * as actions from "../actions/businessActions";

function* businessDeals() {
    try {
        const deals = yield call(service.businessDeals);
        yield put(actions.businessDealsSuccess(deals));
    } catch (e) {
        yield put(actions.businessDealsFailure("Error fetching deals!"));
    }
}

function* businesses() {
    try {
        const services = yield call(service.businesses);
        yield put(actions.businessesSuccess(services));
    } catch (e) {
        yield put(actions.businessesFailure("Error fetching businesses!"));
    }
}

function* watchBusinessDeals() {
    yield takeEvery(types.BUSINESS_DEALS_REQUEST, businessDeals);
}

function* watchBusinesses() {
    yield takeEvery(types.BUSINESSES_REQUEST, businesses);
}

export function* businessSaga() {
    yield all([watchBusinessDeals(), watchBusinesses()]);
}
