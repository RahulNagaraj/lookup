import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blueGrey, grey, purple, red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import { gql, useMutation } from "@apollo/client";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

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

const LoginButton = styled(Button)(() => ({
    color: "#FFF",
    backgroundColor: grey[900],
    "&:hover": {
        backgroundColor: grey[400],
        color: "#000",
    },
}));

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
            token
        }
    }
`;

export default function Header() {
    const classes = useStyles();

    const [openLogin, setOpenLogin] = React.useState(false);
    const [openSignup, setOpenSignup] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isSigningUp, setIsSigningUp] = React.useState(false);
    const [signUp, { data, loading, error }] = useMutation(SIGN_UP);

    // if (!loading) {
    //     const { token } = data;
    //     localStorage.setItem("token", token);
    //     handleCloseSignup();
    // }

    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);

    const handleChange = (event) => {
        setIsLoggedIn(true);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenSignup = () => {
        setOpenLogin(false);
        setOpenSignup(true);
    };

    const handleCloseSignup = () => setOpenSignup(false);

    const handleLogin = () => {
        handleCloseLogin();
        setIsLoggedIn(true);
    };

    const handleSignup = ({ firstName, lastName, email, password }) => {
        signUp({ variables: { firstName, lastName, email, password } });
        setIsSigningUp(true);
    };

    const nofunc = () => {};

    if (isSigningUp) {
        if (error) {
            console.error(error);
        } else if (loading) {
            // do nothing
        } else {
            const {
                signUp: { token },
            } = data;
            localStorage.setItem("token", token);
            handleCloseSignup();
            setIsSigningUp(false);
        }
    }

    const isSignedIn = () => {
        return !!localStorage.getItem("token");
    };

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
                                href={"/#home"}
                                rel={"noopener"}
                            >
                                Lookup
                            </Link>
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            component="span"
                            sx={{ marginRight: 5 }}
                        >
                            <Link
                                className={classes.link}
                                underline="none"
                                href={"/#products"}
                                rel={"noopener"}
                            >
                                Products
                            </Link>
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            component="span"
                            sx={{ marginRight: 5 }}
                        >
                            <Link
                                className={classes.link}
                                underline="none"
                                href={"/#services"}
                                rel={"noopener"}
                            >
                                Services
                            </Link>
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            component="span"
                            sx={{ marginRight: 5 }}
                        >
                            <Link
                                className={classes.link}
                                underline="none"
                                href={"/#trending"}
                                rel={"noopener"}
                            >
                                Trending
                            </Link>
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            component="span"
                            sx={{ marginRight: 5 }}
                        >
                            <Link
                                className={classes.link}
                                underline="none"
                                href={"/#offers"}
                                rel={"noopener"}
                            >
                                Offers
                            </Link>
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            component="span"
                            sx={{ flexGrow: 1 }}
                        >
                            <Link
                                className={classes.link}
                                underline="none"
                                href={"/#recommended"}
                                rel={"noopener"}
                            >
                                Recommended Events
                            </Link>
                        </Typography>
                        {isSignedIn() && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
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
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        My account
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                        {!isSignedIn() && (
                            <Button color="inherit" onClick={handleOpenLogin}>
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <>
                {openLogin && (
                    <LoginModal
                        openLogin={openLogin}
                        handleCloseLogin={handleCloseLogin}
                        handleLogin={handleLogin}
                        handleOpenSignup={handleOpenSignup}
                    />
                )}
            </>
            <>
                {openSignup && (
                    <SignupModal
                        handleCloseSignup={handleCloseSignup}
                        handleSignup={handleSignup}
                        openSignup={openSignup}
                    />
                )}
            </>
        </Box>
    );
}
