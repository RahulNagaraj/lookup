import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { Box, Container, InputBase, CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
    gql,
    useQuery,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

import Services from "./Services";
import RecommendedEvents from "./Recommended";
import Trending from "./Trending";
import Offers from "./Offers";
import TitleHeader from "./TitleHeader";

const httpLink = new HttpLink({
    // uri: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/graphql",
    uri: "https://api.yelp.com/v3/graphql",
    credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
    // const token =
    // "qeamHfaZ6J_1Fj5ZsTq6DRUL3Nsza2xdbgvoYYhz3fejiXOz6VcDkMFMkLAmSBMS_aR1OCPcE5R0uKu5ebEOmeRVC3a1VxTKW4tmLwccDtSeOqxQNGLHAWzWCs10YXYx";
    const token =
        "6EmS4TSTG9DH-7NPwTAqvs0hafEIVeJi0_8f2KngMjwpGIF4nYSurfJOsofff1CQABmyh1TCBHzEfOJ7vsvmoAK9kq7k9gTO9Dem1V6Y1OAkhFEYh1KLjf9avT50YXYx";
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
            "accept-language": "en_US",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(from([errorLink, httpLink])),
    cache: new InMemoryCache(),
});

const GET_ALL = gql`
    query getAll {
        categories {
            category {
                title
                alias
                parent_categories {
                    title
                }
            }
        }
        trending: search(
            term: "Home Services"
            location: "san fransicso"
            attributes: ["hot_and_new"]
        ) {
            business {
                name
                price
                photos
                categories {
                    title
                    parent_categories {
                        title
                    }
                }
            }
        }
        deals: search(
            term: "Home Services"
            location: "san fransicso"
            attributes: ["deals"]
        ) {
            business {
                name
                price
                photos
                categories {
                    title
                    parent_categories {
                        title
                    }
                }
            }
        }
    }
`;

// const CATEGORIES = gql`
//     {
//         categories {
//             category {
//                 title
//                 alias
//                 parent_categories {
//                     title
//                 }
//             }
//         }
//     }
// `;

// const TRENDING = gql`
//     {
//         search(
//             term: "home services"
//             location: "san fransicso"
//             attributes: ["hot_and_new"]
//         ) {
//             business {
//                 name
//                 photos
//                 categories {
//                     title
//                 }
//             }
//         }
//     }
// `;

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

const services = [
    {
        name: "Electricians",
        key: "electricians",
        imagePath: "electician logo.png",
    },
    {
        name: "Plumbers",
        key: "plumbers",
        imagePath: "plumber logo.jpg",
    },
    {
        name: "Carpenters",
        key: "carpenters",
        imagePath: "carpenter logo.png",
    },
    {
        name: "Painters",
        key: "painters",
        imagePath: "painter logo.jpg",
    },
    {
        name: "Appliance Repair",
        key: "applicanceRepair",
        imagePath: "appliance repair logo.jpg",
    },
    {
        name: "Pest Control",
        key: "pestControl",
        imagePath: "pestcontrollogo.png",
    },
    {
        name: "AC Repair",
        key: "acRepair",
        imagePath: "ac repair logo.jpg",
    },
];

// const offers = [
//     {
//         title: "Kitchen Cleaning",
//         offer: "Upto $50 off",
//         imagePath: "Kitchen cleaning.jpg",
//     },
//     {
//         title: "Pest Control",
//         offer: "Flat $50 off",
//         imagePath: "pest control.jpg",
//     },
//     {
//         title: "Appliance Repair",
//         offer: "Starts at $99",
//         imagePath: "appliance repair.jpg",
//     },
// ];

// const trending = [
//     {
//         name: "Air Conditioner",
//         type: "product",
//         recent: "new",
//         imagePath: "ac repair.jpg",
//     },
//     {
//         name: "Plumbing",
//         type: "services",
//         imagePath: "plumber service.jpg",
//     },
//     {
//         name: "Electrical",
//         type: "services",
//         imagePath: "elecrical service.jpg",
//     },
// ];

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

const productsServices = [
    { title: "Air Conditioner" },
    { title: "Water Heater" },
    { title: "Washing Machine" },
    { title: "Oven/Microwave" },
    { title: "Plumbing" },
    { title: "Electrical" },
    { title: "Pest Control" },
    { title: "Carpentry" },
    { title: "Painting" },
    { title: "Kitchen Cleaning" },
];

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "40vw",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        paddingTop: "20px",
        transition: theme.transitions.create("width"),
        width: "100%",
    },
}));

const useStyles = makeStyles((theme) => ({
    margin: {
        backgroundColor: theme.palette.common.white,
        margin: theme.spacing(0),
        width: "100%",
    },
}));

const Home = () => {
    const classes = useStyles();
    let history = useHistory();

    const [location, setLocation] = React.useState("");

    const handleCardClick = () => history.push("/service-detail");

    const handleLocation = (name) => setLocation(name);

    const loading = false,
        error = true,
        data = {};

    /* const { loading, error, data } = useQuery(GET_ALL, {
        client: client,
    }); */

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

                <Trending trending={trending} />

                <Offers offers={deals} />

                <RecommendedEvents recommendedEvents={recommendedEvents} />
            </Container>
        );
    }
};

export default Home;
