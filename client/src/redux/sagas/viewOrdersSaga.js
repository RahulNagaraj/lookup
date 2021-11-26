import { takeEvery, call, put, all } from "redux-saga/effects";

import * as types from "../actionTypes/viewOrdersTypes";
import * as service from "../services/viewOrdersService";
import * as actions from "../actions/viewOrdersActions";

function* viewOrdersByUserId({ userId }) {
    try {
        const data = yield call(service.viewOrdersByUserId, userId);
        yield put(actions.viewOrdersByUserIdSuccess(data));
    } catch (e) {
        yield put(actions.viewOrdersByUserIdFailure("Error fetching data!"));
    }
}

function* viewAllOrders() {
    try {
        const data = yield call(service.viewAllOrders);
        yield put(actions.viewAllOrdersSuccess(data));
    } catch (e) {
        yield put(actions.viewAllOrdersFailure("Error fetching data!"));
    }
}

function* watchViewOrdersByUserId() {
    yield takeEvery(types.VIEW_ORDER_BY_USER_ID_REQUEST, viewOrdersByUserId);
}

function* watchViewAllOrders() {
    yield takeEvery(types.VIEW_ALL_ORDERS_REQUEST, viewAllOrders);
}

export function* viewOrdersSaga() {
    yield all([watchViewOrdersByUserId(), watchViewAllOrders()]);
}
