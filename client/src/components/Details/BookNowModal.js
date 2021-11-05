import React from "react";
import PropTypes from "prop-types";
import { Box, TextField, DialogContent, Button, Grid } from "@mui/material";
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import BootstrapDialog, {
    BootstrapDialogTitle,
} from "../../common/BootstrapDialog";

const BookNowModal = (props) => {
    return (
        <BootstrapDialog
            onClose={props.handleCloseBookNowModal}
            aria-labelledby="book-now-title"
            open={props.openBookNowModal}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <BootstrapDialogTitle
                id="book-now-title"
                onClose={props.handleCloseBookNowModal}
            >
                Book Now
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
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDateTimePicker
                                id="serviceDate"
                                name="serviceDate"
                                value={props.customerDetails.serviceDate}
                                onChange={(newValue) => {
                                    props.handleServiceDate(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        autoFocus
                                        margin="dense"
                                        name="serviceDate"
                                        label="Service Date"
                                        variant="standard"
                                        sx={{ minWidth: "95%" }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box>
                        <Grid container>
                            <Grid item md={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    type="text"
                                    variant="standard"
                                    value={props.customerDetails.firstName}
                                    sx={{ minWidth: "90%" }}
                                    onChange={(e) =>
                                        props.handleBookNowButtonClick(e)
                                    }
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    value={props.customerDetails.lastName}
                                    type="text"
                                    variant="standard"
                                    sx={{ minWidth: "90%" }}
                                    onChange={(e) =>
                                        props.handleBookNowButtonClick(e)
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>
                        <Grid container>
                            <Grid item md={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="phone"
                                    name="phone"
                                    label="Phone Number"
                                    value={props.customerDetails.phone}
                                    type="number"
                                    variant="standard"
                                    sx={{ minWidth: "90%" }}
                                    onChange={(e) =>
                                        props.handleBookNowButtonClick(e)
                                    }
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    value={props.customerDetails.email}
                                    variant="standard"
                                    sx={{ minWidth: "90%" }}
                                    onChange={(e) =>
                                        props.handleBookNowButtonClick(e)
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="address"
                            name="address"
                            label="Address"
                            type="text"
                            value={props.customerDetails.address}
                            variant="standard"
                            sx={{ minWidth: "95%" }}
                            onChange={(e) => props.handleBookNowButtonClick(e)}
                        />
                    </Box>

                    <Box>
                        <Grid container spacing={1}>
                            <Grid item md={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="city"
                                    name="city"
                                    label="City"
                                    type="text"
                                    value={props.customerDetails.city}
                                    variant="standard"
                                    sx={{ minWidth: "90%" }}
                                    onChange={(e) =>
                                        props.handleBookNowButtonClick(e)
                                    }
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="state"
                                    name="state"
                                    label="State"
                                    type="text"
                                    value={props.customerDetails.state}
                                    variant="standard"
                                    sx={{ minWidth: "90%" }}
                                    onChange={(e) =>
                                        props.handleBookNowButtonClick(e)
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="zipCode"
                            name="zipCode"
                            label="ZipCode"
                            type="text"
                            value={props.customerDetails.zipCode}
                            variant="standard"
                            sx={{ minWidth: "45%" }}
                            onChange={(e) => props.handleBookNowButtonClick(e)}
                        />
                    </Box>

                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Button
                            variant="outlined"
                            onClick={props.handleCreateOrder}
                        >
                            Book Now
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
};

BookNowModal.propTypes = {
    handleBookNowButtonClick: PropTypes.func.isRequired,
    customerDetails: PropTypes.object.isRequired,
    handleCloseBookNowModal: PropTypes.func.isRequired,
    openBookNowModal: PropTypes.bool.isRequired,
    handleCreateOrder: PropTypes.func.isRequired,
};

export default BookNowModal;
