import { all } from "redux-saga/effects";

import { userSaga } from "./userSaga";
import { servicesSaga } from "./servicesSaga";

function* rootSaga() {
    yield all([userSaga(), servicesSaga()]);
}

export default rootSaga;
