import { all } from "redux-saga/effects";

import { userSaga } from "./userSaga";
import { servicesSaga } from "./servicesSaga";
import { businessSaga } from "./businessSaga";

function* rootSaga() {
    yield all([userSaga(), servicesSaga(), businessSaga()]);
}

export default rootSaga;
