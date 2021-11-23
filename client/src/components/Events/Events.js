import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid, Typography } from "@mui/material";

import Map from "../../common/Map";
import Filters from "./Filters";
import EventCards from "./EventCards";
import { eventsRequest, setFilterType } from "../../redux/actions/eventActions";
import { constructEventsPlacesObject } from "../../common/util";

const Events = (props) => {
    const dispatch = useDispatch();

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

    const places = constructEventsPlacesObject(eventsState.filteredEvents);

    return (
        <Box>
            <Grid container spacing={1}>
                <Filters
                    filters={eventsState.filters}
                    handleEventFilter={handleEventFilter}
                />
                <Grid item sm={6}>
                    <EventCards events={eventsState.filteredEvents} />
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
