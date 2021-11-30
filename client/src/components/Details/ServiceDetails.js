import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Filters from "./Filters";
import ServiceCards from "./ServiceCards";
import Map from "../../common/Map";
import { constructPlacesObject } from "../../common/util";
import {
    filterBusinesses,
    resetFilter,
    resetReviews,
    setFilter,
} from "../../redux/actions/businessActions";
import { resetRecommendedServices } from "../../redux/actions/analyticsActions";

const ServiceDetails = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const businessesState = useSelector((state) => state.businesses);
    const searchState = useSelector((state) => state.search);

    const { businessTitle, alias, searchLocation } = history?.location?.state;
    const {
        searchFields: { city, zipcode },
    } = searchState;

    const filters = businessesState.filters;

    const updateFilter = (type, value) => {
        dispatch(setFilter(type, value));
    };

    const handleReset = () => {
        dispatch(resetFilter(alias, zipcode, city.value));
    };

    const handleFilterBusinesses = () => {
        dispatch(filterBusinesses());
    };

    const handleBusinesCardClick = (business) => {
        dispatch(resetReviews());
        dispatch(resetRecommendedServices());
        history.push({
            pathname: "/business-detail",
            state: business,
        });
    };

    const places = constructPlacesObject(businessesState.filteredBusinesses);

    return (
        <Box>
            <Grid container spacing={1}>
                <Filters
                    filters={filters}
                    updateFilter={updateFilter}
                    handleReset={handleReset}
                    handleFilterBusinesses={handleFilterBusinesses}
                />
                <Grid item sm={6}>
                    <Container sx={{ my: 1 }}>
                        <Typography variant="h5" textAlign="center">
                            {`${businessTitle} in ${searchLocation.value}`}
                        </Typography>
                    </Container>

                    <ServiceCards
                        businesses={businessesState.filteredBusinesses}
                        handleBusinesCardClick={handleBusinesCardClick}
                    />
                </Grid>
                <Grid item sm={4}>
                    <Map location={searchLocation} places={places} zoom={11} />
                </Grid>
            </Grid>
        </Box>
    );

    /**
     * totalItems = 20
     * itemsPerPage = 5
     * numberOfPages = totalItems / itemsPerPage
     * page = 1
     * items = businesses[(page-1)*itemsPerPage, ((page-1)*itemsPerPage)+itemsPerPage-1]
     */
};

export default ServiceDetails;
