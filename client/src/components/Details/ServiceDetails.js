import React from "react";
import { useHistory } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CircularProgress,
    CardActionArea,
    CardActions,
    CardMedia,
    CardContent,
    Divider,
    Button,
    CardHeader,
    Avatar,
    IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { makeStyles } from "@mui/styles";
import { useQuery } from "@apollo/client";

import Filters from "./Filters";
import { SEARCH_SERVICE } from "../../graphql/queries";
import yelpClient from "../../services/yelp";

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
        margin: "auto",
        borderRadius: spacing(2), // 16px
        transition: "0.3s",
        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
        position: "relative",
        maxWidth: 500,
        marginLeft: "auto",
        overflow: "initial",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: spacing(2),
        [breakpoints.up("md")]: {
            flexDirection: "row",
            paddingTop: spacing(2),
        },
    },
    media: {
        width: "88%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: spacing(-3),
        height: 0,
        paddingBottom: "48%",
        borderRadius: spacing(2),
        backgroundColor: "#fff",
        position: "relative",
        [breakpoints.up("md")]: {
            width: "100%",
            marginLeft: spacing(-3),
            marginTop: 0,
            transform: "translateX(-8px)",
        },
        "&:after": {
            content: '" "',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)",
            borderRadius: spacing(2), // 16
            opacity: 0.5,
        },
    },
    content: {
        padding: 24,
    },
    cta: {
        marginTop: 24,
        textTransform: "initial",
    },
}));

const ServiceDetails = (props) => {
    let history = useHistory();
    const businessType = history?.location?.state;
    const [filters, setFilters] = React.useState({
        jobType: "",
        sortType: "",
        costType: "",
        distance: "",
    });

    const loading = false,
        error = true,
        data = { search: { business: [] } };

    // const { loading, error, data } = useQuery(SEARCH_SERVICE, {
    //     client: yelpClient,
    //     variables: { term: businessType, location: "chicago" },
    // });

    const businesses = data?.search?.business;

    const updateFilter = (type, value) => {
        setFilters({
            ...filters,
            [type]: value,
        });
    };

    return (
        <Box>
            <Grid container spacing={1}>
                <Filters filters={filters} updateFilter={updateFilter} />

                <Grid item sm={6}>
                    {loading ? (
                        <Container maxWidth="md">
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
                    ) : (
                        <Box
                            component="main"
                            display="flex"
                            justifyContent="center"
                            sx={{ mt: 1, mb: 5 }}
                        >
                            <Container>
                                {businesses.map((business) => (
                                    <Card
                                        sx={{ minWidth: 350, minHeight: 200 }}
                                        sx={{ mt: 2 }}
                                    >
                                        <CardHeader
                                            avatar={
                                                <Avatar
                                                    sx={{ bgcolor: red[500] }}
                                                    aria-label="recipe"
                                                >
                                                    {business.name[0]}
                                                </Avatar>
                                            }
                                            title={business.name}
                                            subheader={
                                                business.categories.length > 0
                                                    ? business.categories
                                                          .map(
                                                              (cat) =>
                                                                  `${cat.title}`
                                                          )
                                                          .join(", ")
                                                    : ""
                                            }
                                        />
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={business.photos[0]}
                                            alt={business.name}
                                        />
                                        <CardContent>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                This impressive paella is a
                                                perfect party dish and a fun
                                                meal to cook together with your
                                                guests. Add 1 cup of frozen peas
                                                along with the mussels, if you
                                                like.
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton aria-label="add to favorites">
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton aria-label="share">
                                                <ShareIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Container>
                        </Box>
                    )}
                </Grid>
                <Grid item sm={4}></Grid>
            </Grid>
        </Box>
    );
};

export default ServiceDetails;
