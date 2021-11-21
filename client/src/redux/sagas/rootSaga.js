import { all } from "redux-saga/effects";

import { userSaga } from "./userSaga";
import { servicesSaga } from "./servicesSaga";
import { businessSaga } from "./businessSaga";
import { searchSaga } from "./searchSaga";

function* rootSaga() {
    yield all([userSaga(), servicesSaga(), businessSaga(), searchSaga()]);
}

export default rootSaga;
