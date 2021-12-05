import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    Typography,
    Grid,
    Container,
    Button,
    FormControl,
    InputLabel,
    Input,
    Select,
    MenuItem,
} from "@mui/material";

const REVIEWS_FILTER = [
    { key: "recommended", label: "50-100" },
    { key: "highest", label: "100+" },
    { key: "lowest", label: "0-50" },
];
const RATING_FILTER = [
    { key: "recommended", label: "Recommended" },
    { key: "highest", label: "Highest Rated" },
    { key: "lowest", label: "Lowest Rated" },
];
const OPEN_NOW_FILTER = [
    { key: "all", label: "All" },
    { key: 1, label: "Yes" },
    { key: 0, label: "No" },
];

const Filters = (props) => {
    return (
        <Grid item sm={2}>
            <Container>
                <Box sx={{ mt: 2, mb: 1 }}>
                    <Typography variant="h5">Filters</Typography>
                    <FormControl
                        variant="standard"
                        sx={{
                            mt: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <InputLabel id="reviewCount">Review Count</InputLabel>
                        <Select
                            labelId="reviewCount"
                            id="jobType-select"
                            value={props.filters.reviewCount}
                            label="Review Count"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {REVIEWS_FILTER.map((data) => (
                                <MenuItem
                                    key={data.key}
                                    value={data.key}
                                    onClick={() =>
                                        props.updateFilter(
                                            "reviewCount",
                                            data.key
                                        )
                                    }
                                >
                                    {data.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ mt: 1 }}>
                    <FormControl
                        variant="standard"
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <InputLabel id="rating">Rating</InputLabel>
                        <Select
                            labelId="rating"
                            id="rating-select"
                            value={props.filters.rating}
                            label="Rating"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {RATING_FILTER.map((data) => (
                                <MenuItem
                                    key={data.key}
                                    value={data.key}
                                    onClick={() =>
                                        props.updateFilter("rating", data.key)
                                    }
                                >
                                    {data.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ mt: 1 }}>
                    <FormControl
                        variant="standard"
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <InputLabel id="openNow">Open Now</InputLabel>
                        <Select
                            labelId="openNow"
                            id="openNow-select"
                            value={props.filters.isOpenNow}
                            label="Open Now"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {OPEN_NOW_FILTER.map((data) => (
                                <MenuItem
                                    key={data.key}
                                    value={data.key}
                                    onClick={() =>
                                        props.updateFilter(
                                            "isOpenNow",
                                            data.key
                                        )
                                    }
                                >
                                    {data.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ mt: 1.5, mb: 2 }}>
                    <FormControl
                        variant="standard"
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <InputLabel id="zipcode">Zip Code</InputLabel>
                        <Input
                            id="zipcode-input"
                            value={props.filters.zipcode}
                            onChange={(e) =>
                                props.updateFilter("zipcode", e.target.value)
                            }
                        />
                    </FormControl>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Button
                        variant="contained"
                        onClick={props.handleFilterBusinesses}
                    >
                        Go
                    </Button>
                    <Button variant="contained" onClick={props.handleReset}>
                        Reset
                    </Button>
                </Box>
            </Container>
        </Grid>
    );
};

Filters.propTypes = {
    updateFilter: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    handleReset: PropTypes.func.isRequired,
};

export default Filters;
