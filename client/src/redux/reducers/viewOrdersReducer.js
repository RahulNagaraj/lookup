import * as types from "../actionTypes/viewOrdersTypes";

const initialState = {
    isFetching: false,
    data: [],
    error: "",
    setAllViewOrders: false,
};

export const viewOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.VIEW_ALL_ORDERS_REQUEST:
        case types.VIEW_ORDER_BY_USER_ID_REQUEST:
            return {
                ...state,
                isFetching: true,
            };

        case types.VIEW_ORDER_BY_USER_ID_REQUEST_SUCCESS:
        case types.VIEW_ALL_ORDERS_REQUEST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data,
            };

        case types.VIEW_ORDER_BY_USER_ID_REQUEST_FAILURE:
        case types.VIEW_ALL_ORDERS_REQUEST_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error,
                data: [],
            };

        case types.SET_VIEW_ALL_ORDERS:
            return {
                ...initialState,
                setAllViewOrders: action.setAllViewOrders,
            };

        default:
            return {
                ...state,
            };
    }
};
