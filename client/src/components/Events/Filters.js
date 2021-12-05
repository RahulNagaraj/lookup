import React from "react";
import {
    Box,
    Typography,
    Grid,
    Container,
    Button,
    Paper,
    Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DoneIcon from "@mui/icons-material/Done";

const CATEGORIES = [
    { key: "music", value: "Music" },
    { key: "performing-arts", value: "Performing Arts" },
    { key: "sports-active-life", value: "Sports Active Life" },
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
    return (
        <Grid item sm={2}>
            <Container>
                <Box sx={{ mt: 2, mb: 1 }}>
                    <Typography variant="h5">Filters</Typography>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="text" onClick={props.handleReset}>
                            Reset
                        </Button>
                    </Box>
                    <Typography varaiant="h4">Category</Typography>
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
                            return (
                                <ListItem key={data.key}>
                                    <Chip
                                        variant={"filled"}
                                        label={data.value}
                                        icon={
                                            data.key ===
                                            props.filters["category"] ? (
                                                <DoneIcon />
                                            ) : null
                                        }
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
                                        icon={
                                            data.key ===
                                            props.filters["attendingCount"] ? (
                                                <DoneIcon />
                                            ) : null
                                        }
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
                                        icon={
                                            data.key ===
                                            props.filters["free"] ? (
                                                <DoneIcon />
                                            ) : null
                                        }
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
            </Container>
        </Grid>
    );
};

export default Filters;
