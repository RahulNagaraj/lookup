import * as React from "react";
import {
    Box,
    Button,
    DialogContent,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Input,
    TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import BootstrapDialog, {
    BootstrapDialogTitle,
} from "../common/BootstrapDialog";
import PropTypes from "prop-types";

const SignupModal = (props) => {
    const [signUpDetails, setSignUpDetails] = React.useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });
    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleFirstName = (event) => {
        setSignUpDetails({
            ...signUpDetails,
            firstName: event.target.value,
        });
    };

    const handleLastName = (event) => {
        setSignUpDetails({
            ...signUpDetails,
            lastName: event.target.value,
        });
    };

    const handleEmail = (event) => {
        setSignUpDetails({
            ...signUpDetails,
            email: event.target.value,
        });
    };

    const handlePassword = (event) => {
        setSignUpDetails({
            ...signUpDetails,
            password: event.target.value,
        });
    };

    const handleSignupClick = () => {
        props.handleSignup(signUpDetails);
    };

    return (
        <BootstrapDialog
            onClose={props.handleCloseSignup}
            aria-labelledby="customized-dialog-title"
            open={props.openSignup}
            maxWidth={"xs"}
            fullWidth={true}
        >
            <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={props.handleCloseSignup}
            >
                Sign Up
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box>
                        <Grid container>
                            <Grid item md={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="firstName"
                                    label="First Name"
                                    type="text"
                                    variant="standard"
                                    defaultValue={signUpDetails.firstName}
                                    onChange={(e) => handleFirstName(e)}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="lastName"
                                    label="Last Name"
                                    type="text"
                                    variant="standard"
                                    defaultValue={signUpDetails.lastName}
                                    onChange={(e) => handleLastName(e)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            variant="standard"
                            sx={{ minWidth: "95%" }}
                            defaultValue={setSignUpDetails.email}
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
                                            onChange={handleShowPassword}
                                            onMouseDown={handleShowPassword}
                                        >
                                            {showPassword ? (
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

                    <Box sx={{ textAlign: "center", m: 1 }}>
                        <Button
                            sx={{ mt: 1 }}
                            variant="outlined"
                            color="secondary"
                            onClick={handleSignupClick}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
};

SignupModal.propTypes = {
    handleSignup: PropTypes.func.isRequired,
    handleCloseSignup: PropTypes.func.isRequired,
    openSignup: PropTypes.bool.isRequired,
};

export default SignupModal;
