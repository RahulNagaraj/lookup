import * as React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly, ...rest }) => {
    const userState = useSelector((state) => state.user);
    const { userDetails } = userState;

    const checkAccess = () => {
        if (adminOnly)
            return userState.isLoggedIn && userDetails.role === "ADMIN";
        return userState.isLoggedIn;
    };

    return (
        <Route
            {...rest}
            render={() => {
                return checkAccess() ? children : <Redirect to="/signin" />;
            }}
        />
    );
};

export default PrivateRoute;
