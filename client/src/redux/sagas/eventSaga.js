import { takeEvery, call, put, all } from "redux-saga/effects";

import * as types from "../actionTypes/eventTypes";
import * as service from "../services/eventService";
import * as actions from "../actions/eventActions";

function* events({ userId }) {
    try {
        const services = yield call(service.events, userId);
        yield put(actions.eventsSuccess(services));
    } catch (e) {
        yield put(actions.eventsFailure("Error fetching events!"));
    }
}

function* watchEvents() {
    yield takeEvery(types.EVENTS_REQUEST, events);
}

export function* eventSaga() {
    yield all([watchEvents()]);
}
