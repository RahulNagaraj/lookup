import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        orders: [Order!]
        order(id: ID!): Order
        viewOrderByUserId(userId: ID!): Order
    }
    extend type Mutation {
        createOrder(
            businessId: String!
            businessName: String!
            serviceType: String!
            orderDate: Date!
            serviceDate: Date!
            userId: ID!
            customerName: String!
            email: String!
            phone: String!
            address: String!
        ): Order!
        updateOrder(email: String!, password: String!): Order!
        deleteOrder(id: ID!): Boolean!
    }
    type Order {
        id: ID!
        businessId: String!
        businessName: String!
        serviceType: String!
        orderDate: Date!
        serviceDate: Date!
        userId: String!
        customerName: String!
        email: String!
        phone: String!
        address: String!
    }
`;
