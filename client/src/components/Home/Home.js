import React from "react";
import { Box, Container, CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import Services from "./Services";
import RecommendedEvents from "./Recommended";
import Trending from "./Trending";
import Offers from "./Offers";
import TitleHeader from "./TitleHeader";
import yelpClient from "../../redux/services/yelp";
import { YelpQuery } from "../../graphql";
import Loader from "../../common/Loader";
import { servicesRequest } from "../../redux/actions/servicesActions";
import {
    businessDealsRequest,
    getBusinessByServiceType,
} from "../../redux/actions/businessActions";

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
    const history = useHistory();
    const dispatch = useDispatch();

    const servicesState = useSelector((state) => state.services);
    const businessesState = useSelector((state) => state.businesses);

    React.useEffect(() => {
        if (!servicesState.isFetching && servicesState.services.length === 0) {
            dispatch(servicesRequest());
        }
    }, [servicesState]);

    React.useEffect(() => {
        if (!businessesState.isFetching && businessesState.deals.length === 0) {
            dispatch(businessDealsRequest());
        }
    }, [businessesState]);

    const [location, setLocation] = React.useState({
        key: "chicago",
        value: "Chicago",
        coordinates: {
            lat: 41.881832,
            lng: -87.623177,
        },
    });

    const handleCardClick = (title, alias) => {
        dispatch(getBusinessByServiceType(alias, location.value));
        history.push({
            pathname: "/service-detail",
            state: {
                businessTitle: title,
                searchLocation: location,
            },
        });
    };

    const businessCardClick = (business) =>
        history.push({
            pathname: "/business-detail",
            state: business,
        });

    const handleLocation = (loc) => setLocation(loc);

    if (servicesState.isFetching) {
        return <Loader />;
    } else if (servicesState.error != "") {
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
            <Container id="home" maxWidth="xl" disableGutters>
                <TitleHeader
                    locations={locations}
                    services={servicesState.services}
                    handleLocation={handleLocation}
                    location={location}
                />

                <Services
                    homeServices={servicesState.services}
                    handleCardClick={handleCardClick}
                />

                {/* <Trending
                    trending={trending}
                    handleBusinessCardClick={businessCardClick}
                /> */}

                <Offers offers={businessesState.deals} />

                <RecommendedEvents recommendedEvents={recommendedEvents} />
            </Container>
        );
    }
};

export default Home;
