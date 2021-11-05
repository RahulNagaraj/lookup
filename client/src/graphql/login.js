import { gql } from "@apollo/client";

const SIGN_UP = gql`
    mutation signUp(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
    ) {
        signUp(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
        ) {
            user {
                id
                firstName
                lastName
                email
                role
            }
            token
        }
    }
`;

const SIGN_IN = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            user {
                id
                firstName
                lastName
                email
                role
            }
            token
        }
    }
`;

export default {
    SIGN_UP,
    SIGN_IN,
};
