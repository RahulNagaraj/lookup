import { gql } from "@apollo/client";

const VIEW_ORDER_BY_USER_ID = gql`
    query viewOrderById($userId: ID!) {
        orders: viewOrderByUserId(userId: $userId) {
            id
            businessName
            orderDate
            serviceDate
            customerName
            address
        }
    }
`;

const VIEW_ALL_ORDERS = gql`
    query orders {
        orders {
            id
            businessName
            orderDate
            serviceDate
            customerName
            address
        }
    }
`;

export default {
    VIEW_ORDER_BY_USER_ID,
    VIEW_ALL_ORDERS,
};
