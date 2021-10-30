import React from "react";
import { useHistory } from "react-router-dom";
import {
    Box,
    Container,
    Grid,
    CircularProgress,
} from "@mui/material";
import { useQuery } from "@apollo/client";

import Filters from "./Filters";
import { SEARCH_SERVICE } from "../../graphql/queries";
import yelpClient from "../../services/yelp";
import ServiceCards from "./ServiceCards";

const ServiceDetails = (props) => {
    let history = useHistory();
    const businessType = history?.location?.state;
    const [filters, setFilters] = React.useState({
        jobType: "",
        sortType: "",
        costType: "",
        distance: "",
    });
    const itemsPerPage = 5;
    // const [businesses, setBusinesses] = React.useState([]);

    const updateFilter = (type, value) => {
        setFilters({
            ...filters,
            [type]: value,
        });
    };

    // const loading = false,
    //     error = true,
    //     data = { search: { business: [] } };

    const { loading, error, data } = useQuery(SEARCH_SERVICE, {
        client: yelpClient,
        variables: { term: businessType, location: "chicago" },
    });

    const businesses = data?.search?.business;
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
                    <Filters filters={filters} updateFilter={updateFilter} />
                    <Grid item sm={6}>
                        <ServiceCards businesses={businesses} />
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
