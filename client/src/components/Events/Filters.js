import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    Typography,
    Grid,
    Container,
    Button,
    Paper,
    // ListItem,
    Chip,
    FormControl,
    InputLabel,
    Input,
    Select,
    MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import DoneIcon from "@mui/icons-material/Done";
import { blueGrey, red } from "@mui/material/colors";

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

const CATEGORIES = [
    { key: "music", value: "Music" },
    { key: "performing-arts", value: "Performing Arts" },
    { key: "sports-active-life", value: "Sports Active Life" },
    { key: "nightlife", value: "Nightlife" },
];

const ATTENDING_COUNT = [
    { key: "lowest", value: "0-49" },
    { key: "recommended", value: "50-100" },
    { key: "highest", value: "100+" },
];

const IS_FREE = [
    { key: "free", value: "Free" },
    { key: "cancelled", value: "Cancelled" },
    { key: "official", value: "Official" },
];

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const Filters = (props) => {
    const classes = useStyles();

    return (
        <Grid item sm={2}>
            <Container>
                <Box sx={{ mt: 2, mb: 1 }}>
                    <Typography variant="h5">Filters</Typography>
                    {/*<FormControl
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
                    </FormControl> */}
                    <Typography varaiant="h4" sx={{ mt: 1 }}>
                        Category
                    </Typography>
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
                        {CATEGORIES.map((data) => {
                            console.log(
                                "data",
                                data.key,
                                props.filters["category"]
                            );
                            return (
                                <ListItem
                                    key={data.key}
                                    // sx={{ pt: 0.5, px: 0 }}
                                >
                                    <Chip
                                        // classes={{
                                        //     root: classes.selected,
                                        //     filled: classes.filled,
                                        // }}
                                        variant={"filled"}
                                        label={data.value}
                                        deleteIcon={
                                            data.key ===
                                            props.filters["category"] ? (
                                                <DoneIcon />
                                            ) : null
                                        }
                                        onDelete={() => {}}
                                        onClick={() =>
                                            props.handleEventFilter(
                                                "category",
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
                    <Typography varaiant="h4">Attending Count</Typography>
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
                        {ATTENDING_COUNT.map((data) => {
                            return (
                                <ListItem
                                    key={data.key}
                                    sx={{ pt: 0.5, px: 0 }}
                                >
                                    <Chip
                                        variant={"filled"}
                                        label={data.value}
                                        deleteIcon={
                                            data.key ===
                                            props.filters["attendingCount"] ? (
                                                <DoneIcon />
                                            ) : null
                                        }
                                        onDelete={() => {}}
                                        onClick={() =>
                                            props.handleEventFilter(
                                                "attendingCount",
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
                    <Typography varaiant="h4">Free</Typography>
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
                        {IS_FREE.map((data) => {
                            return (
                                <ListItem
                                    key={data.key}
                                    sx={{ pt: 0.5, px: 0 }}
                                >
                                    <Chip
                                        variant={"filled"}
                                        label={data.value}
                                        deleteIcon={
                                            data.key ===
                                            props.filters["free"] ? (
                                                <DoneIcon />
                                            ) : null
                                        }
                                        onDelete={() => {}}
                                        onClick={() =>
                                            props.handleEventFilter(
                                                "free",
                                                data.key
                                            )
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </Paper>
                </Box>

                <Box sx={{ mt: 1.5, mb: 2 }}>
                    {/* <FormControl
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
                    </FormControl> */}
                </Box>
            </Container>
        </Grid>
    );
};

export default Filters;
