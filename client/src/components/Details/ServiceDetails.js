import React, { Component, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, Container, Grid, CircularProgress } from "@mui/material";
import { useQuery } from "@apollo/client";

import Filters from "./Filters";
import { SEARCH_SERVICE } from "../../graphql/queries";
import yelpClient from "../../services/yelp";
import ServiceCards from "./ServiceCards";

const covertToMiles = (meters) => {
    if (meters) return meters * 0.000621371;
    else return 0;
};

const ServiceDetails = (props) => {
    const history = useHistory();
    const businessType = history?.location?.state;
    const [filters, updateFilters] = React.useState({
        jobType: "",
        sortType: "",
        costType: "",
        distance: "",
    });
    const [businesses, setBusinesses] = React.useState([]);
    const [filteredBusinesses, setFilteredBusinesses] = React.useState([]);

    // const loading = false,
    // error = true,
    // data = { search: { business: [] } };

    const { loading, error, data } = useQuery(SEARCH_SERVICE, {
        client: yelpClient,
        variables: { term: businessType, location: "chicago" },
    });

    useEffect(() => {
        if (!loading && data) {
            setBusinesses(data?.search?.business);
            setFilteredBusinesses(data?.search?.business);
        }
    }, [loading, data]);

    const filterByRating = (value) => {
        const newBusinesses = filteredBusinesses.filter((business) => {
            if (value === "highest") return business.rating > 3.5;
            else if (value === " lowest") return business.rating < 2;
            else return business.rating >= 2;
        });

        setFilteredBusinesses(newBusinesses);
    };

    const filterByDistance = (value) => {
        const newBusinesses = filteredBusinesses.filter((business) => {
            const distanceMiles = covertToMiles(business.distance);
            if (value === "walking" && distanceMiles <= 1.5) return true;
            else if (
                value === "biking" &&
                distanceMiles > 1.5 &&
                distanceMiles <= 4
            )
                return true;
            else if (value === "driving" && distanceMiles > 4) return true;
            return false;
        });

        console.log("newBusinesses distance: ", newBusinesses);

        setFilteredBusinesses(() => newBusinesses);
    };

    const updateFilter = (type, value) => {
        updateFilters({
            ...filters,
            [type]: value,
        });

        if (type === "sortType") {
            filterByRating(value);
        } else if (type === "distance") {
            filterByDistance(value);
        }
    };

    const handleReset = () => {
        setFilteredBusinesses(businesses);
        updateFilters({
            jobType: "",
            sortType: "",
            costType: "",
            distance: "",
        });
    };

    if (loading) {
        return (
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "85vh",
                    }}
                >
                    <CircularProgress />
                </Box>
            </Container>
        );
    } else if (error) {
        return (
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "85vh",
                    }}
                >
                    Error downloading the data
                </Box>
            </Container>
        );
    } else {
        return (
            <Box>
                <Grid container spacing={1}>
                    <Filters
                        filters={filters}
                        updateFilter={updateFilter}
                        handleReset={handleReset}
                    />
                    <Grid item sm={6}>
                        <ServiceCards businesses={filteredBusinesses} />
                    </Grid>
                    <Grid item sm={4}></Grid>
                </Grid>
            </Box>
        );
    }

    /**
     * totalItems = 20
     * itemsPerPage = 5
     * numberOfPages = totalItems / itemsPerPage
     * page = 1
     * items = businesses[(page-1)*itemsPerPage, ((page-1)*itemsPerPage)+itemsPerPage-1]
     */
};

export default ServiceDetails;
