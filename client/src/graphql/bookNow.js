import { gql } from "@apollo/client";

const CREATE_ORDER = gql`
    mutation createOrder(
        $businessId: String!
        $businessName: String!
        $serviceType: String!
        $orderDate: Date!
        $serviceDate: Date!
        $userId: ID!
        $customerName: String!
        $email: String!
        $phone: String!
        $address: String!
    ) {
        createOrder(
            businessId: $businessId
            businessName: $businessName
            serviceType: $serviceType
            orderDate: $orderDate
            serviceDate: $serviceDate
            userId: $userId
            customerName: $customerName
            email: $email
            phone: $phone
            address: $address
        ) {
            id
        }
    }
`;

export default {
    CREATE_ORDER,
};
