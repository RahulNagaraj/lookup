import React from "react";
import { useHistory } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Grid,
    Rating,
    Card,
    CardMedia,
    Divider,
    CardContent,
    Avatar,
    CardHeader,
    Paper,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    CardActions,
} from "@mui/material";
import { red } from "@mui/material/colors";
import PhoneIcon from "@mui/icons-material/Phone";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RateReviewIcon from "@mui/icons-material/RateReview";

import Maps from "./Maps";

const parseOpenHours = (openHours) => {
    if (openHours && openHours.length > 0) {
        const openHoursObj = {};
        openHours.forEach((open) => {
            if (openHoursObj[open.day]) {
                const obj = {
                    end: open.end,
                };
                openHoursObj[open.day] = { ...obj };
            } else {
                const obj = {
                    start: open.start,
                    end: open.end,
                };
                openHoursObj[open.day] = { ...obj };
            }
        });

        return openHoursObj;
    }
};

const OpenHours = ({ business }) => {
    const openHours = parseOpenHours(business?.hours[0].open);
    const week = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    Object.keys(openHours).map((key) => console.log(key));
    return (
        <Grid item sm={6} textAlign="center">
            <Typography variant="h6">Open Hours</Typography>
            <br />
            <Grid container spacing={2}>
                <Grid item sm={4}>
                    {Object.keys(openHours).map((key) => (
                        <Typography variant="subtitle1">{week[key]}</Typography>
                    ))}
                </Grid>
                <Grid item sm={8}>
                    {Object.values(openHours).map((value) => (
                        <Typography variant="subtitle1">{`Open: ${value.start} - Close: ${value.end}`}</Typography>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

const Review = ({ key, review }) => {
    const date = new Date(review.time_created);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formatedDate = date.toLocaleDateString("en-US", options);
    return (
        <Card key={key} sx={{ my: 1 }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        src={review.user.image_url}
                    ></Avatar>
                }
                title={review.user.name}
                subheader={formatedDate}
                // subheader={`Rating: ${review.rating}`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {review.text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Rating
                    name="review-rating"
                    precision={0.5}
                    value={review.rating}
                    readOnly
                    size="small"
                />
            </CardActions>
        </Card>
    );
};

const BusinessDetails = () => {
    const history = useHistory();
    const business = history?.location?.state;
    console.log(business);
    return (
        <Box sx={{ mb: 8 }}>
            <Grid container spacing={2}>
                {/* Left Pane */}
                <Grid item sm={8}>
                    <Container sx={{ my: 2, ml: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item sx={4}>
                                <Card sx={{ maxWidth: 140 }}>
                                    <CardMedia
                                        component="img"
                                        alt={business.name}
                                        height="100"
                                        image={business.photos[0]}
                                    />
                                </Card>
                            </Grid>
                            <Grid item sx={8}>
                                <Box>
                                    <Typography variant="h4">
                                        {business.name}
                                    </Typography>
                                    <Rating
                                        name="half-rating-read"
                                        precision={0.5}
                                        value={business.rating}
                                        readOnly
                                    />
                                    <Typography variant="caption">
                                        {business.review_count}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="button">
                                        {business.hours.is_open_now
                                            ? "Open Now"
                                            : "Closed"}
                                    </Typography>
                                    <Divider
                                        orientation="vertical"
                                        component="span"
                                        variant="middle"
                                        sx={{ mx: 2 }}
                                    ></Divider>
                                    <Typography variant="button">
                                        {business.categories[0].title}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                        <Box>
                            <Typography variant="h6">Top Reviews</Typography>
                            {business.reviews.map((review, i) => (
                                <Review key={i} review={review} />
                            ))}
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box>
                            <Typography variant="h6">Location</Typography>
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                    <Card
                                        sx={{
                                            maxHeight: 350,
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        <CardContent sx={{ padding: 0 }}>
                                            <Maps
                                                location={{
                                                    lat: business.coordinates
                                                        .latitude,
                                                    lng: business.coordinates
                                                        .longitude,
                                                }}
                                                zoomLevel={12}
                                                places={[
                                                    {
                                                        coordinates:
                                                            business.coordinates,
                                                    },
                                                ]}
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <OpenHours business={business} />
                            </Grid>
                        </Box>
                    </Container>
                </Grid>
                {/* Right Pane */}
                <Grid item sm={4}>
                    <Container sx={{ my: 2 }}>
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: 360,
                                bgcolor: "background.paper",
                            }}
                        >
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PhoneIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={business.display_phone}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                {/* <Divider /> */}
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <RateReviewIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Write Review" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <AddShoppingCartIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Book" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BusinessDetails;
