import client from "../../graphql/client";
import { LoginQuery } from "../../graphql";

export const signUp = async ({
    firstName,
    lastName,
    email,
    password,
    role,
}) => {
    const user = await client.mutate({
        mutation: LoginQuery.SIGN_UP,
        variables: {
            firstName,
            lastName,
            email,
            password,
            role,
        },
    });

    const userDetails = user.data.signUp;
    localStorage.setItem("user", JSON.stringify(userDetails));
    return userDetails;
};

export const signIn = async ({ email, password }) => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (userLocalStorage && userLocalStorage.token) {
        return userLocalStorage;
    }

    const user = await client.mutate({
        mutation: LoginQuery.SIGN_IN,
        variables: {
            email,
            password,
        },
    });

    const userDetails = user.data.signIn;
    localStorage.setItem("user", JSON.stringify(userDetails));
    return userDetails;
};

export const checkUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    }
    return null;
};

export const logout = () => {
    console.log("logout service");
    localStorage.removeItem("user");
    return;
};
