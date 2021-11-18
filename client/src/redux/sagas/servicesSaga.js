import { takeEvery, call, put, all } from "redux-saga/effects";

import * as types from "../actionTypes/servicesTypes";
import * as service from "../services/servicesService";
import * as actions from "../actions/servicesActions";

function* services() {
    try {
        const services = yield call(service.services);
        yield put(actions.servicesSuccess(services));
    } catch (e) {
        yield put(actions.servicesFailure("Error fetching services!"));
    }
}

function* watchServices() {
    yield takeEvery(types.SERVICES_REQUEST, services);
}

export function* servicesSaga() {
    yield all([watchServices()]);
}
