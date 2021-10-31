import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    Typography,
    Grid,
    Chip,
    Container,
    Paper,
    ListItem,
    ButtonGroup,
    Button,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blueGrey, red } from "@mui/material/colors";

const JOB_TYPE_FILTER = [
    { key: "repair", label: "Repair" },
    { key: "installation", label: "Installation" },
    { key: "inspection", label: "Inspection" },
];
const SORT_TYPE_FILTER = [
    { key: "recommended", label: "Recommended" },
    { key: "highest", label: "Highest Rated" },
    { key: "lowest", label: "Lowest Rated" },
];
const COST_TYPE_FILTER = [
    { key: "$", label: "Low" },
    { key: "$$", label: "Medium" },
    { key: "$$$", label: "High" },
];
const DISTANCE_FILTER = [
    { key: "driving", label: "Driving" },
    { key: "walking", label: "Walking" },
    { key: "biking", label: "Biking" },
];

const useStyles = makeStyles({
    selected: {
        "&:focus": {
            background: `${red[500]} !important`,
            color: "#000 !important",
        },
        "&:active": {
            background: `${red[500]} !important`,
            color: "#000 !important",
        },
        "&:hover": {
            background: `${blueGrey[300]} !important`,
            color: "#000 !important",
        },
    },
    filled: {
        background: `${red[500]} !important`,
        color: "#000 !important",
    },
});

const Filters = (props) => {
    const classes = useStyles();
    return (
        <Grid item sm={2}>
            <Container>
                <Box sx={{ mt: 2, mb: 1 }}>
                    <Typography variant="h5">Filters</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            minWidth: 150,
                        }}
                    >
                        <Button size="small" onClick={props.handleReset}>
                            Reset
                        </Button>
                    </Box>
                    <FormControl
                        variant="standard"
                        sx={{
                            mt: 0,
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <InputLabel id="jobType">Job Type</InputLabel>
                        <Select
                            labelId="jobType"
                            id="jobType-select"
                            value={props.filters.jobType}
                            label="Job Type"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {JOB_TYPE_FILTER.map((data) => (
                                <MenuItem
                                    key={data.key}
                                    value={data.key}
                                    onClick={() =>
                                        props.updateFilter("jobType", data.key)
                                    }
                                >
                                    {data.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* <Typography varaiant="h4">Job Type</Typography>
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            flexWrap: "wrap",
                            listStyle: "none",
                            p: 0.5,
                            m: 0,
                            background: "transparent",
                        }}
                        elevation={0}
                        component="ul"
                    >
                        {JOB_TYPE_FILTER.map((data) => {
                            return (
                                <ListItem
                                    key={data.key}
                                    sx={{ pt: 0.5, px: 0 }}
                                >
                                    <Chip
                                        classes={{
                                            root: classes.selected,
                                            filled: classes.filled,
                                        }}
                                        variant={
                                            props.filters.jobType === data.key
                                                ? "filled"
                                                : "outlined"
                                        }
                                        label={data.label}
                                        onClick={() =>
                                            props.updateFilter(
                                                "jobType",
                                                data.key
                                            )
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </Paper> */}
                </Box>

                <Box sx={{ mt: 1 }}>
                    <FormControl
                        variant="standard"
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <InputLabel id="sortType">Rating</InputLabel>
                        <Select
                            labelId="sortType"
                            id="sortType-select"
                            value={props.filters.sortType}
                            label="Sort"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {SORT_TYPE_FILTER.map((data) => (
                                <MenuItem
                                    key={data.key}
                                    value={data.key}
                                    onClick={() =>
                                        props.updateFilter("sortType", data.key)
                                    }
                                >
                                    {data.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* <Typography varaiant="h4">Sort</Typography>
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            flexWrap: "wrap",
                            listStyle: "none",
                            p: 0.5,
                            m: 0,
                            background: "transparent",
                        }}
                        elevation={0}
                        component="ul"
                    >
                        {SORT_TYPE_FILTER.map((data) => {
                            return (
                                <ListItem
                                    key={data.key}
                                    sx={{ pt: 0.5, px: 0 }}
                                >
                                    <Chip
                                        classes={{
                                            root: classes.selected,
                                            filled: classes.filled,
                                        }}
                                        variant={
                                            props.filters.sortType === data.key
                                                ? "filled"
                                                : "outlined"
                                        }
                                        label={data.label}
                                        onClick={() =>
                                            props.updateFilter(
                                                "sortType",
                                                data.key
                                            )
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </Paper> */}
                </Box>

                <Box sx={{ mt: 1 }}>
                    <FormControl
                        variant="standard"
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <InputLabel id="costType">Cost</InputLabel>
                        <Select
                            labelId="costType"
                            id="costType-select"
                            value={props.filters.costType}
                            label="Cost"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {COST_TYPE_FILTER.map((data) => (
                                <MenuItem
                                    key={data.key}
                                    value={data.key}
                                    onClick={() =>
                                        props.updateFilter("costType", data.key)
                                    }
                                >
                                    {data.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/*  <Typography varaiant="h4">Cost</Typography>
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            flexWrap: "wrap",
                            listStyle: "none",
                            p: 0.5,
                            m: 0,
                            background: "transparent",
                        }}
                        elevation={0}
                        component="ul"
                    >
                        <ButtonGroup
                            aria-label="button group"
                            variant="outlined"
                        >
                            {COST_TYPE_FILTER.map((data) => (
                                <Button
                                    classes={{
                                        root: classes.selected,
                                        contained: classes.filled,
                                    }}
                                    variant={
                                        data.key === props.filters.costType
                                            ? "contained"
                                            : "outlined"
                                    }
                                    key={data.key}
                                    onClick={() =>
                                        props.updateFilter("costType", data.key)
                                    }
                                >
                                    {data.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Paper> */}
                </Box>

                <Box sx={{ mt: 1.5, mb: 2 }}>
                    <FormControl
                        variant="standard"
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <InputLabel id="distance">Distance</InputLabel>
                        <Select
                            labelId="distance"
                            id="distance-select"
                            value={props.filters.distance}
                            label="Distance"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {DISTANCE_FILTER.map((data) => (
                                <MenuItem
                                    key={data.key}
                                    value={data.key}
                                    onClick={() =>
                                        props.updateFilter("distance", data.key)
                                    }
                                >
                                    {data.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
