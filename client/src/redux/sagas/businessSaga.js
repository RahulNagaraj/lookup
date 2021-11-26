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
        const businesses = yield call(service.businesses);
        yield put(actions.businessesSuccess(businesses));
    } catch (e) {
        yield put(actions.businessesFailure("Error fetching businesses!"));
    }
}

function* reviews({ business_id }) {
    try {
        const reviews = yield call(service.reviews, business_id);
        yield put(actions.reviewsSuccess(reviews));
    } catch (e) {
        yield put(actions.reviewsFailure("Error fetching reviews!"));
    }
}

function* addReview({ review }) {
    try {
        const newReview = yield call(service.addReview, review);
        yield put(actions.addReviewSuccess(newReview));
    } catch (e) {
        yield put(actions.addReviewFailure("Error adding review!"));
    }
}

function* deleteReview({ data }) {
    try {
        const newReviews = yield call(service.deleteReview, data);
        yield put(actions.deleteReviewSuccess(newReviews));
    } catch (e) {
        yield put(actions.deleteReviewFailure("Error deleting review!"));
    }
}

function* watchBusinessDeals() {
    yield takeEvery(types.BUSINESS_DEALS_REQUEST, businessDeals);
}

function* watchBusinesses() {
    yield takeEvery(types.BUSINESSES_REQUEST, businesses);
}

function* watchReviews() {
    yield takeEvery(types.REVIEWS_REQUEST, reviews);
}

function* watchAddReview() {
    yield takeEvery(types.ADD_REVIEW_REQUEST, addReview);
}

function* watchDeleteReview() {
    yield takeEvery(types.DELETE_REVIEW_REQUEST, deleteReview);
}

export function* businessSaga() {
    yield all([
        watchBusinessDeals(),
        watchBusinesses(),
        watchReviews(),
        watchAddReview(),
        watchDeleteReview(),
    ]);
}
