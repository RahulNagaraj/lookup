import React from "react";
import { Box, Container, CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Services from "./Services";
import RecommendedEvents from "./Recommended";
import Trending from "./Trending";
import Offers from "./Offers";
import TitleHeader from "./TitleHeader";
import yelpClient from "../../services/yelp";
import { YelpQuery } from "../../graphql";

const locations = [
    {
        key: "chicago",
        value: "Chicago",
        coordinates: {
            lat: 41.881832,
            lng: -87.623177,
        },
    },
    {
        key: "new_york",
        value: "New York",
        coordinates: {
            lat: 40.73061,
            lng: -73.935242,
        },
    },
    {
        key: "san_fransisco",
        value: "San Fransisco",
        coordinates: {
            lat: 37.773972,
            lng: -122.431297,
        },
    },
    {
        key: "seattle",
        value: "Seattle",
        coordinates: {
            lat: 47.608013,
            lng: -122.335167,
        },
    },
];

const recommendedEvents = [
    {
        title: "Marathon 21k",
        type: "sports",
        location: "Chicago",
        imagePath: "marathon event.jpg",
    },
    {
        title: "Halloween Night",
        type: "social",
        location: "New York",
        imagePath: "halloween events.jpg",
    },
    {
        title: "Christmas Carol",
        type: "social",
        location: "Seattle",
        imagePath: "christmas events.jpg",
    },
    {
        title: "Easter Day",
        type: "social",
        location: "San Fransisco",
        imagePath: "easter events.jpg",
    },
];

const Home = () => {
    let history = useHistory();

    const [location, setLocation] = React.useState({ value: "" });

    const handleCardClick = (title, alias) =>
        history.push({
            pathname: "/service-detail",
            state: {
                businessTitle: title,
                alias,
                searchLocation: location,
            },
        });

    const businessCardClick = (business) =>
        history.push({
            pathname: "/business-detail",
            state: business,
        });

    const handleLocation = (loc) => setLocation(loc);

    // const loading = false,
    //     error = true,
    //     data = {};

    const { loading, error, data } = useQuery(YelpQuery.GET_ALL, {
        client: yelpClient,
    });

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
        const categories = data?.categories?.category;
        const trending = data?.trending?.business;
        const deals = data?.deals?.business;
        const aliasFilters = [
            "carpenters",
            "electricians",
            "homecleaning",
            "painters",
            "plumbing",
            "hvac",
            "waterheaterinstallrepair",
            "blinds",
        ];
        const homeServices = categories.filter((cat) =>
            aliasFilters.includes(cat.alias)
        );

        return (
            <Container id="home" maxWidth="xl" disableGutters>
                <TitleHeader
                    locations={locations}
                    services={homeServices}
                    handleLocation={handleLocation}
                    location={location}
                />

                <Services
                    homeServices={homeServices}
                    handleCardClick={handleCardClick}
                />

                <Trending
                    trending={trending}
                    handleBusinessCardClick={businessCardClick}
                />

                <Offers offers={deals} />

                <RecommendedEvents recommendedEvents={recommendedEvents} />
            </Container>
        );
    }
};

export default Home;
