import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    Typography,
    DialogContent,
    Button,
    Rating,
    Grid,
    FormControl,
    InputLabel,
    Input,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import BootstrapDialog, {
    BootstrapDialogTitle,
} from "../../common/BootstrapDialog";

const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
};

const AddReviewModal = (props) => {
    const [hover, setHover] = React.useState(-1);

    return (
        <BootstrapDialog
            onClose={props.handleCloseAddReviewModal}
            aria-labelledby="add-review-title"
            open={props.openAddReviewModal}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <BootstrapDialogTitle
                id="add-review-title"
                onClose={props.handleCloseAddReviewModal}
            >
                Add Review
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
                        <FormControl fullWidth variant="standard">
                            <InputLabel htmlFor="review-text">
                                Review
                            </InputLabel>
                            <Input
                                id="review-text"
                                value={props.reviewDetails.text}
                                name="text"
                                onChange={props.handleSetReviewDetail}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="div">
                                    Rating
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Rating
                                    name="rating"
                                    value={Number.parseFloat(
                                        props.reviewDetails.rating
                                    )}
                                    precision={0.5}
                                    onChange={(event, newValue) => {
                                        return props.handleSetReviewDetail(
                                            event
                                        );
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={
                                        <StarIcon
                                            style={{ opacity: 0.55 }}
                                            fontSize="inherit"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item>
                                {props.reviewDetails.rating !== null && (
                                    <Box sx={{ ml: 2 }}>
                                        {
                                            labels[
                                                hover !== -1
                                                    ? hover
                                                    : props.reviewDetails.rating
                                            ]
                                        }
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Button
                            variant="outlined"
                            onClick={props.handleAddReview}
                        >
                            Add a Review
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
};

AddReviewModal.propTypes = {
    openAddReviewModal: PropTypes.bool.isRequired,
    handleCloseAddReviewModal: PropTypes.func.isRequired,
    reviewDetails: PropTypes.object.isRequired,
    handleSetReviewDetail: PropTypes.func.isRequired,
    handleAddReview: PropTypes.func.isRequired,
};

export default AddReviewModal;
