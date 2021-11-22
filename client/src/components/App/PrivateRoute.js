import * as React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    const userState = useSelector((state) => state.user);
    const { userDetails } = userState;
    return (
        <Route
            {...rest}
            render={() => {
                return userDetails.isLoggedIn &&
                    userDetails.role === "ADMIN" ? (
                    children
                ) : (
                    <Redirect to="/signin" />
                );
            }}
        />
    );
};

export default PrivateRoute;
