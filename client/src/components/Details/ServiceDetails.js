import React from "react";
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

const ServiceDetails = (props) => {
    const classes = useStyles();
    const [filters, setFilters] = React.useState({
        jobType: "",
        sortType: "",
        costType: "",
        distance: "",
    });
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

    const updateFilter = (type, value) => {
        setFilters({
            ...filters,
            [type]: value,
        });
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Grid container spacing={1}>
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
                                                    filters.jobType === data.key
                                                        ? "filled"
                                                        : "outlined"
                                                }
                                                label={data.label}
                                                onClick={() =>
                                                    updateFilter(
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
                                                    filters.sortType ===
                                                    data.key
                                                        ? "filled"
                                                        : "outlined"
                                                }
                                                label={data.label}
                                                onClick={() =>
                                                    updateFilter(
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
                                                data.key === filters.costType
                                                    ? "contained"
                                                    : "outlined"
                                            }
                                            key={data.key}
                                            onClick={() =>
                                                updateFilter(
                                                    "costType",
                                                    data.key
                                                )
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
                                    defaultValue={filters.distance}
                                    name="radio-buttons-group"
                                >
                                    {DISTANCE_FILTER.map((data) => (
                                        <FormControlLabel
                                            sx={{ p: 0 }}
                                            value={data.key}
                                            control={<Radio />}
                                            label={data.label}
                                            onChange={() =>
                                                updateFilter(
                                                    "distance",
                                                    data.key
                                                )
                                            }
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Container>
                </Grid>
                <Grid item sm={6}>
                    <Box component="main">
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Rhoncus dolor purus non enim
                            praesent elementum facilisis leo vel. Risus at
                            ultrices mi tempus imperdiet. Semper risus in
                            hendrerit gravida rutrum quisque non tellus.
                            Convallis convallis tellus id interdum velit laoreet
                            id donec ultrices. Odio morbi quis commodo odio
                            aenean sed adipiscing. Amet nisl suscipit adipiscing
                            bibendum est ultricies integer quis. Cursus euismod
                            quis viverra nibh cras. Metus vulputate eu
                            scelerisque felis imperdiet proin fermentum leo.
                            Mauris commodo quis imperdiet massa tincidunt. Cras
                            tincidunt lobortis feugiat vivamus at augue. At
                            augue eget arcu dictum varius duis at consectetur
                            lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                            donec massa sapien faucibus et molestie ac.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sm={4}></Grid>
            </Grid>
        </Box>
    );
};

export default ServiceDetails;
