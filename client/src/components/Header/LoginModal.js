import * as React from "react";
import {
    Box,
    Button,
    DialogContent,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";
import * as PropTypes from "prop-types";
import BootstrapDialog, {
    BootstrapDialogTitle,
} from "../../common/BootstrapDialog";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const LoginButton = styled(Button)(() => ({
    color: "#FFF",
    backgroundColor: grey[900],
    "&:hover": {
        backgroundColor: grey[400],
        color: "#000",
    },
}));

const LoginModal = (props) => {
    const [signInDetails, setSignInDetails] = React.useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = React.useState(false);

    const handleEmail = (event) => {
        setSignInDetails({
            ...signInDetails,
            email: event.target.value,
        });
    };

    const handlePassword = (event) => {
        setSignInDetails({
            ...signInDetails,
            password: event.target.value,
        });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSignIn = () => {
        props.handleLogin(signInDetails);
    };

    return (
        <BootstrapDialog
            onClose={props.handleCloseLogin}
            aria-labelledby="customized-dialog-title"
            open={props.openLogin}
            maxWidth={"xs"}
            fullWidth={true}
        >
            <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={props.handleCloseLogin}
            >
                Login
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            variant="standard"
                            sx={{ minWidth: "95%" }}
                            onChange={(e) => handleEmail(e)}
                        />
                    </Box>
                    <Box>
                        <FormControl
                            sx={{ m: 1, minWidth: "95%" }}
                            variant="standard"
                        >
                            <InputLabel htmlFor="standard-adornment-password">
                                Password
                            </InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => handlePassword(e)}
                                fullWidth={true}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleShowPassword}
                                            onMouseDown={handleShowPassword}
                                        >
                                            {true ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <LoginButton variant="outlined" onClick={handleSignIn}>
                            Login
                        </LoginButton>
                    </Box>
                    <Box sx={{ textAlign: "center", mt: 4 }}>
                        <Typography>Not a customer?</Typography>
                        <Button
                            sx={{ mt: 1 }}
                            variant="outlined"
                            color="secondary"
                            onClick={props.handleOpenSignup}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
};

LoginModal.propTypes = {
    openLogin: PropTypes.bool.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleCloseLogin: PropTypes.func.isRequired,
    handleOpenSignup: PropTypes.func.isRequired,
};

export default LoginModal;
