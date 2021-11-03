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
import { GET_ALL } from "../../graphql/queries";

const locations = [
    {
        value: "Chicago",
    },
    {
        value: "New York",
    },
    {
        value: "San Fransisco",
    },
    {
        value: "Seattle",
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

    const [location, setLocation] = React.useState("");

    const handleCardClick = (type) =>
        history.push({
            pathname: "/service-detail",
            state: type,
        });

    const businessCardClick = (business) =>
        history.push({
            pathname: "/business-detail",
            state: business,
        });

    const handleLocation = (name) => setLocation(name);

    // const loading = false,
    //     error = true,
    //     data = {};

    const { loading, error, data } = useQuery(GET_ALL, {
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
