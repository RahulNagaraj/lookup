import * as React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from "../../common/util";

const PrivateRoute = ({ children, adminOnly, ...rest }) => {
    const userState = useSelector((state) => state.user);

    const checkAccess = () => {
        if (adminOnly) return isAdmin(userState);
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
