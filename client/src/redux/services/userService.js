import client from "../../graphql/client";
import { LoginQuery } from "../../graphql";

export const signUp = async ({ firstName, lastName, email, password }) => {
    return await client.mutate({
        mutation: LoginQuery.SIGN_UP,
        variables: {
            firstName,
            lastName,
            email,
            password,
        },
    });
};

export const signIn = async ({ email, password }) => {
    return await client.mutate({
        mutation: LoginQuery.SIGN_IN,
        variables: {
            email,
            password,
        },
    });
};
