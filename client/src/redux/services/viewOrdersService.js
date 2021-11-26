import client from "../../graphql/client";
import { ViewOrdersQuery } from "../../graphql";

export const viewOrdersByUserId = async (userId) => {
    const data = await client.query({
        query: ViewOrdersQuery.VIEW_ORDER_BY_USER_ID,
        variables: { userId },
    });

    return data.data.orders;
};

export const viewAllOrders = async () => {
    const data = await client.query({
        query: ViewOrdersQuery.VIEW_ALL_ORDERS,
    });

    return data.data.orders;
};
