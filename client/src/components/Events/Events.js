import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Grid,
    Container,
    Typography,
    CircularProgress,
} from "@mui/material";

import Map from "../../common/Map";
import Filters from "./Filters";
import EventCards from "./EventCards";
import {
    eventsRequest,
    setFilterType,
    resetFilter,
} from "../../redux/actions/eventActions";
import { constructEventsPlacesObject } from "../../common/util";
import { useHistory } from "react-router";

const Events = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userState = useSelector((state) => state.user);
    const eventsState = useSelector((state) => state.events);

    React.useEffect(() => {
        if (
            !eventsState.isFetching &&
            eventsState.error === "" &&
            eventsState.events.length === 0
        ) {
            dispatch(eventsRequest(userState.userDetails.id));
        }
    }, [eventsState]);

    const handleEventFilter = (type, value) => {
        dispatch(setFilterType(type, value));
    };

    const handleReset = () => {
        dispatch(resetFilter());
    };

    let location = {};

    const handleOnEventClick = (event) => {
        history.push({
            pathname: "/event-detail",
            state: event,
        });
    };

    const places = constructEventsPlacesObject(eventsState.filteredEvents);
    if (eventsState.filteredEvents.length !== 0) {
        location = {
            key: eventsState.filteredEvents[0].location.city.toLowerCase(),
            value: eventsState.filteredEvents[0].location.city,
            coordinates: {
                lat: eventsState.filteredEvents[0].latitude,
                lng: eventsState.filteredEvents[0].longitude,
            },
        };
    }

    if (eventsState.isFetching) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (eventsState.filteredEvents.length === 0) {
        return (
            <Container
                sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h6">No Events Nearby</Typography>
            </Container>
        );
    }

    return (
        <Box>
            <Grid container spacing={1}>
                <Filters
                    filters={eventsState.filters}
                    handleEventFilter={handleEventFilter}
                    handleReset={handleReset}
                />
                <Grid item sm={6}>
                    <EventCards
                        events={eventsState.filteredEvents}
                        handleOnEventClick={handleOnEventClick}
                    />
                </Grid>
                <Grid item sm={4}>
                    <Map
                        location={location}
                        places={places}
                        showCurrentLocation
                        zoom={11}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Events;
