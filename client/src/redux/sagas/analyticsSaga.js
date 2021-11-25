import { takeEvery, call, put, all } from "redux-saga/effects";

import * as types from "../actionTypes/analyticsTypes";
import * as service from "../services/analyticsService";
import * as actions from "../actions/analyticsActions";

function* noOfRequestsPerYearRequest({ year }) {
    console.log("saga", year);
    try {
        const data = yield call(service.noOfRequestsPerYearRequest, year);
        yield put(actions.noOfRequestsPerYearSuccess(data));
    } catch (e) {
        yield put(actions.noOfRequestsPerYearError("Error fetching data!"));
    }
}

function* typeOfRequests() {
    try {
        const data = yield call(service.typeOfRequests);
        yield put(actions.typeOfRequestsSuccess(data));
    } catch (e) {
        yield put(actions.typeOfRequestsError("Error fetching data!"));
    }
}

function* zipcodeVsNoOfRequests() {
    try {
        const data = yield call(service.zipcodeVsNoOfRequests);
        yield put(actions.zipcodeVsNoOfRequestsSuccess(data));
    } catch (e) {
        yield put(actions.zipcodeVsNoOfRequestsError("Error fetching data!"));
    }
}

function* cityVsTypeOfRequests() {
    try {
        const data = yield call(service.cityVsTypeOfRequests);
        yield put(actions.cityVsTypeOfRequestsSuccess(data));
    } catch (e) {
        yield put(actions.cityVsTypeOfRequestsError("Error fetching data!"));
    }
}

function* topRatedServices() {
    try {
        const data = yield call(service.topRatedServices);
        yield put(actions.topRatedServicesSuccess(data));
    } catch (e) {
        yield put(actions.topRatedServicesError("Error fetching data!"));
    }
}

function* watchNoOfRequestsPerYearRequest() {
    yield takeEvery(
        types.NUMBER_OF_REQUESTS_PER_YEAR_REQUEST,
        noOfRequestsPerYearRequest
    );
}

function* watchTypeOfRequests() {
    yield takeEvery(types.TYPE_OF_SERVICE_REQUESTS_REQUEST, typeOfRequests);
}

function* watchZipcodeVsNoOfRequests() {
    yield takeEvery(
        types.ZIPCODE_VS_NUMBER_OF_REQUESTS_REQUEST,
        zipcodeVsNoOfRequests
    );
}

function* watchCityVsTypeOfRequests() {
    yield takeEvery(
        types.CITY_VS_TYPE_OF_SERVICE_REQUESTS_REQUEST,
        cityVsTypeOfRequests
    );
}

function* watchTopRatedServices() {
    yield takeEvery(types.TOP_RATED_SERVICES_REQUEST, topRatedServices);
}

export function* analyticsSaga() {
    yield all([
        watchNoOfRequestsPerYearRequest(),
        watchTypeOfRequests(),
        watchZipcodeVsNoOfRequests(),
        watchCityVsTypeOfRequests(),
        watchTopRatedServices(),
    ]);
}
