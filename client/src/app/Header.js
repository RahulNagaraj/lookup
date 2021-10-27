import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Link, Button, DialogContent, TextField, FormControl, InputLabel, Input, InputAdornment} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {blueGrey, grey, purple, red} from "@mui/material/colors";
import BootstrapDialog, {BootstrapDialogTitle} from "../common/BootstrapDialog";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const useStyles = makeStyles({
    link: {
        '&:hover': {
            color: red[500],
        },
        '&:focus': {
            color: red[700],
        }
    },
    signupButton: {
        backgroundColor: purple[900],
    }
});

const LoginButton = styled(Button)(() => ({
    color: "#FFF",
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[400],
        color: "#000"
    },
}));

export default function Header() {
    const classes = useStyles();

    const [openLogin, setOpenLogin] = React.useState(false);
    const [openSignup, setOpenSignup] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);
    const handleSignup = () => setOpenSignup(false);

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
    }
    const handleCloseSignup = () => {
        setOpenSignup(false);
    }

    const handleLogin = () => {
        handleCloseLogin();
        setIsLoggedIn(true);
    }

    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ backgroundColor: blueGrey[900] }}>
                        <Typography variant="h5" component="div" sx={{ marginRight: 10 }}>
                            <Link underline="none" href={"/#home"} rel={"noopener"}>Lookup</Link>
                        </Typography>
                        <Typography variant="subtitle2" component="span" sx={{ marginRight: 5 }}>
                            <Link className={classes.link} underline="none" href={"/#products"} rel={"noopener"}>Products</Link>
                        </Typography>
                        <Typography variant="subtitle2" component="span" sx={{ marginRight: 5 }}>
                            <Link className={classes.link} underline="none" href={"/#services"} rel={"noopener"}>Services</Link>
                        </Typography>
                        <Typography variant="subtitle2" component="span" sx={{ marginRight: 5 }}>
                            <Link className={classes.link} underline="none" href={"/#trending"} rel={"noopener"}>Trending</Link>
                        </Typography>
                        <Typography variant="subtitle2" component="span" sx={{ marginRight: 5 }}>
                            <Link className={classes.link} underline="none" href={"/#offers"} rel={"noopener"}>Offers</Link>
                        </Typography>
                        <Typography variant="subtitle2" component="span" sx={{ flexGrow: 1 }}>
                            <Link className={classes.link} underline="none" href={"/#recommended"} rel={"noopener"}>Recommended Events</Link>
                        </Typography>
                        {isLoggedIn && (
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
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )}
                        {!isLoggedIn && <Button color="inherit" onClick={handleOpenLogin}>Login</Button>}
                    </Toolbar>
                </AppBar>
            </Box>
            <>
                {openLogin && <LoginModal openLogin={openLogin}
                                          handleCloseLogin={handleCloseLogin}
                                          handleLogin={handleLogin}
                                          handleOpenSignup={handleOpenSignup}  />}
            </>
            <>
                {openSignup && <SignupModal  handleCloseSignup={handleCloseSignup}
                                             handleSignup={handleSignup}
                                             openSignup={openSignup} />}
            </>
        </Box>
    );
}
