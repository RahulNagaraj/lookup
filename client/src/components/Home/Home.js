import React from "react";
import { Container } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Services from "./Services";
import Offers from "./Offers";
import TitleHeader from "./TitleHeader";
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
        value: "San Francisco",
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

const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const servicesState = useSelector((state) => state.services);
    const businessesState = useSelector((state) => state.businesses);
    const searchState = useSelector((state) => state.search);

    React.useEffect(() => {
        if (!servicesState.isFetching && servicesState.services.length === 0) {
            dispatch(servicesRequest());
        }
    }, [servicesState, dispatch]);

    React.useEffect(() => {
        if (!businessesState.isFetching && businessesState.deals.length === 0) {
            dispatch(businessDealsRequest());
        }
    }, [businessesState, dispatch]);

    const [location, setLocation] = React.useState({
        key: "chicago",
        value: "Chicago",
        coordinates: {
            lat: 41.881832,
            lng: -87.623177,
        },
    });

    const handleCardClick = (title, alias) => {
        const {
            searchFields: { city, zipcode },
        } = searchState;

        dispatch(getBusinessByServiceType(alias, zipcode, city.value));

        history.push({
            pathname: "/service-detail",
            state: {
                businessTitle: title,
                alias,
                searchLocation: city,
            },
        });
    };

    const handleLocation = (loc) => setLocation(loc);

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
                loading={servicesState.isFetching}
            />

            <Offers offers={businessesState.deals} />
        </Container>
    );
};

export default Home;
