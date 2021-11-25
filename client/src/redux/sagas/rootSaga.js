import { all } from "redux-saga/effects";

import { userSaga } from "./userSaga";
import { servicesSaga } from "./servicesSaga";
import { businessSaga } from "./businessSaga";
import { searchSaga } from "./searchSaga";
import { eventSaga } from "./eventSaga";
import { analyticsSaga } from "./analyticsSaga";

function* rootSaga() {
    yield all([
        userSaga(),
        servicesSaga(),
        businessSaga(),
        searchSaga(),
        eventSaga(),
        analyticsSaga(),
    ]);
}

export default rootSaga;
