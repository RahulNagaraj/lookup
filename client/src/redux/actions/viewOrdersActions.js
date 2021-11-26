import * as types from "../actionTypes/viewOrdersTypes";

export const viewOrdersByUserIdRequest = (userId) => {
    return {
        type: types.VIEW_ORDER_BY_USER_ID_REQUEST,
        userId,
    };
};

export const viewOrdersByUserIdSuccess = (data) => {
    return {
        type: types.VIEW_ORDER_BY_USER_ID_REQUEST_SUCCESS,
        data,
    };
};

export const viewOrdersByUserIdFailure = (error) => {
    return {
        type: types.VIEW_ORDER_BY_USER_ID_REQUEST_FAILURE,
        error,
    };
};

export const viewAllOrdersRequest = () => {
    return {
        type: types.VIEW_ALL_ORDERS_REQUEST,
    };
};

export const viewAllOrdersSuccess = (data) => {
    return {
        type: types.VIEW_ALL_ORDERS_REQUEST_SUCCESS,
        data,
    };
};

export const viewAllOrdersFailure = (error) => {
    return {
        type: types.VIEW_ALL_ORDERS_REQUEST_FAILURE,
        error,
    };
};

export const setViewAllOrders = (setAllViewOrders) => {
    return {
        type: types.SET_VIEW_ALL_ORDERS,
        setAllViewOrders,
    };
};
