import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid, Typography } from "@mui/material";

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
    const searchState = useSelector((state) => state.search);

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

    const handleOnEventClick = (event) => {
        console.log("event", event);
        history.push({
            pathname: "/event-detail",
            state: event,
        });
    };

    const places = constructEventsPlacesObject(eventsState.filteredEvents);
    console.log(places);

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
                        location={searchState.searchFields.city}
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
