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
    TextField
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BootstrapDialog, {BootstrapDialogTitle} from "../common/BootstrapDialog";
import PropTypes from "prop-types";

const SignupModal = (props) => {
    return (
        <BootstrapDialog
            onClose={props.handleCloseSignup}
            aria-labelledby="customized-dialog-title"
            open={props.openSignup}
            maxWidth={"xs"}
            fullWidth={true}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleCloseSignup}>
                Sign Up
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
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
                                    id="name"
                                    label="First Name"
                                    type="text"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Last Name"
                                    type="text"
                                    variant="standard"
                                />
                            </Grid>

                        </Grid>
                    </Box>
                    <Box>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            variant="standard"
                            sx={{ minWidth: '95%' }}
                        />

                    </Box>
                    <Box>
                        <FormControl sx={{ m: 1, minWidth: '95%' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={'password'}
                                onChange={() => { }}
                                fullWidth={true}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => { }}
                                            onMouseDown={() => { }}
                                        >
                                            {true ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl sx={{ m: 1, minWidth: '95%' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-re-password">Re-enter Password</InputLabel>
                            <Input
                                id="standard-adornment-re-password"
                                type={'password'}
                                onChange={() => { }}
                                fullWidth={true}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => { }}
                                            onMouseDown={() => { }}
                                        >
                                            {true ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ textAlign: 'center', m: 1 }}>
                        <Button sx={{ mt: 1 }}
                                variant="outlined"
                                color="secondary"
                                onClick={props.handleSignup}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
}

SignupModal.propTypes = {
    handleSignup: PropTypes.func.isRequired,
    handleCloseSignup: PropTypes.func.isRequired,
    openSignup: PropTypes.bool.isRequired,
}

export default SignupModal;