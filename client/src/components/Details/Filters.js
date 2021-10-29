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
    { key: "lowest", label: "Lowest Ratedd" },
];
const COST_TYPE_FILTER = [
    { key: "$", label: "$" },
    { key: "$$", label: "$$" },
    { key: "$$$", label: "$$$" },
    { key: "$$$$", label: "$$$$" },
];
const DISTANCE_FILTER = [
    { key: "driving", label: "Driving" },
    { key: "walking", label: "Walking" },
    { key: "biking", label: "Biking" },
];

const useStyles = makeStyles({
    selected: {
        "&:focus": {
            background: `${blueGrey[300]} !important`,
            color: "#000 !important",
        },
        "&:active": {
            background: `${blueGrey[300]} !important`,
            color: "#000 !important",
        },
        "&:hover": {
            background: `${red[300]} !important`,
            color: "#000 !important",
        },
    },
    filled: {
        background: `${blueGrey[300]} !important`,
        color: "#000 !important",
    },
});

const Filters = (props) => {
    const classes = useStyles();
    return (
        <Grid item sm={2}>
            <Container>
                <Box sx={{ mt: 2, mb: 1 }}>
                    <Typography varaiant="h4">Job Type</Typography>
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
                    </Paper>
                </Box>

                <Box sx={{ mt: 1 }}>
                    <Typography varaiant="h4">Sort</Typography>
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
                    </Paper>
                </Box>

                <Box sx={{ mt: 1 }}>
                    <Typography varaiant="h4">Cost</Typography>
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
                    </Paper>
                </Box>

                <Box sx={{ mt: 1.5, mb: 2 }}>
                    <Typography varaiant="h4">Distance</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="distance"
                            defaultValue={props.filters.distance}
                            name="radio-buttons-group"
                        >
                            {DISTANCE_FILTER.map((data) => (
                                <FormControlLabel
                                    sx={{ p: 0 }}
                                    value={data.key}
                                    control={<Radio />}
                                    label={data.label}
                                    onChange={() =>
                                        props.updateFilter("distance", data.key)
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Container>
        </Grid>
    );
};

Filters.propTypes = {
    updateFilter: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
};

export default Filters;
