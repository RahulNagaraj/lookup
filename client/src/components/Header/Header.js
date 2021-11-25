import * as React from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blueGrey, grey, purple, red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useDispatch, useSelector } from "react-redux";
import {
    logoutRequest,
    signInRequest,
    signUpRequest,
} from "../../redux/actions/userActions";

const useStyles = makeStyles({
    link: {
        "&:hover": {
            color: red[500],
        },
        "&:focus": {
            color: red[700],
        },
    },
    signupButton: {
        backgroundColor: purple[900],
    },
});

export default function Header() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorAnalyticsEl, setAnchorAnalyticsEl] = React.useState(null);

    const user = useSelector((state) => state.user);

    const handleLoginClick = () => {
        history.push("/signin");
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewOrder = () => {
        handleClose();
        history.push("/view-order");
    };

    const handleLogout = () => {
        dispatch(logoutRequest());
    };

    const getName = () => {
        const { userDetails } = user;

        return `${userDetails.firstName[0].toUpperCase()}${userDetails.lastName[0].toUpperCase()}`;
    };

    const style =
        user.isLoggedIn && user.userDetails.role === "USER"
            ? { marginRight: 4 }
            : { flexGrow: 1 };

    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ backgroundColor: blueGrey[900] }}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ marginRight: 10 }}
                        >
                            <Link
                                underline="none"
                                href={"#"}
                                rel={"noopener noreferrer"}
                            >
                                Lookup
                            </Link>
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            component="span"
                            sx={{ marginRight: 4 }}
                        >
                            <Link
                                className={classes.link}
                                underline="none"
                                href={"/#services"}
                                rel={"noopener noreferrer"}
                            >
                                Services
                            </Link>
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            component="span"
                            sx={{ marginRight: 4 }}
                        >
                            <Link
                                className={classes.link}
                                underline="none"
                                href={"/#offers"}
                                rel={"noopener noreferrer"}
                            >
                                Offers
                            </Link>
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            component="span"
                            sx={style}
                        >
                            <Link
                                className={classes.link}
                                underline="none"
                                href={"/events"}
                                rel={"noopener noreferrer"}
                            >
                                Recommended Events
                            </Link>
                        </Typography>
                        {user.isLoggedIn && user.userDetails.role === "USER" && (
                            <Typography
                                variant="subtitle2"
                                component="span"
                                sx={{ flexGrow: 1 }}
                            >
                                <Link
                                    className={classes.link}
                                    underline="none"
                                    rel={"noopener noreferrer"}
                                    href={"/analytics"}
                                >
                                    Analytics
                                </Link>
                            </Typography>
                        )}
                        {user.isLoggedIn && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <Avatar sx={{ bgcolor: red["A700"] }}>
                                        {getName()}
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        {user.isLoggedIn
                                            ? `${user.userDetails.firstName}, ${user.userDetails.lastName}`
                                            : `Profile`}
                                    </MenuItem>
                                    <MenuItem onClick={handleViewOrder}>
                                        View Order
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                        {!user.isLoggedIn && (
                            <Button color="inherit" onClick={handleLoginClick}>
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    );
}
