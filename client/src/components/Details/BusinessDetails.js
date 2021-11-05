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
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    CardActions,
} from "@mui/material";
import { red } from "@mui/material/colors";
import PhoneIcon from "@mui/icons-material/Phone";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useMutation } from "@apollo/client";

import Maps from "./Maps";
import BookNowModal from "./BookNowModal";
import OrderConfirmationModal from "./OrderConfirmationModal";
import { constructPlacesObject } from "../../common/util";
import { BookNowQuery } from "../../graphql";

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
        "Sunday",
    ];

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

const Review = ({ k, review }) => {
    const date = new Date(review.time_created);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formatedDate = date.toLocaleDateString("en-US", options);
    return (
        <Card key={k} sx={{ my: 1 }}>
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
    const [bookNowClicked, setBookNow] = React.useState(false);
    const [openBookNowModal, setOpenBookNowModal] = React.useState(false);
    const [showOrderConfirmationModal, setOrderConfirmationModal] =
        React.useState(false);
    const [orderConfirmationModalOpen, setOrderConfirmationModalOpen] =
        React.useState(false);
    const [customerDetails, setCustomerDetails] = React.useState({
        serviceDate: new Date(),
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    });
    const [createOrder, { data, loading, error }] = useMutation(
        BookNowQuery.CREATE_ORDER
    );

    const handleCreateOrder = () => {
        const {
            serviceDate,
            firstName,
            lastName,
            address,
            phone,
            email,
            city,
            state,
            zipCode,
        } = customerDetails;
        const orderDate = new Date();
        const customerName = `${firstName}, ${lastName}`;
        const customerAddress = `${address}, ${city}, ${state} - ${zipCode}`;
        const { id: businessId, name: businessName, categories } = business;
        const userId = localStorage.getItem("userId");
        createOrder({
            variables: {
                businessId,
                businessName,
                serviceType: categories.length > 0 ? categories[0].title : "",
                orderDate,
                serviceDate,
                userId,
                customerName,
                email,
                phone,
                address: customerAddress,
            },
        });
        setOpenBookNowModal(false);
    };

    if (!loading && !error && data && data.createOrder && data.createOrder.id) {
        if (!showOrderConfirmationModal) {
            setOrderConfirmationModal(true);
            setOrderConfirmationModalOpen(true);
        }
    }

    const handleBookNowModalClick = () => {
        setBookNow(!bookNowClicked);
        setOpenBookNowModal(true);
    };

    const handleCloseBookNowModal = () => {
        setOpenBookNowModal(false);
    };

    const handleBookNowButtonClick = (e) => {
        setCustomerDetails(() => {
            return {
                ...customerDetails,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleServiceDate = (serviceDate) => {
        setCustomerDetails(() => {
            return {
                ...customerDetails,
                serviceDate: new Date(serviceDate),
            };
        });
    };

    const handleOrderConfirmationModal = () => {
        setOrderConfirmationModal(false);
        setOrderConfirmationModalOpen(false);
        history.push("/");
    };

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
                                <Review k={i} review={review} />
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
                                                zoomLevel={15}
                                                places={constructPlacesObject([
                                                    business,
                                                ])}
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
                                <ListItem>
                                    <ListItemIcon>
                                        <PhoneIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={business.display_phone}
                                    />
                                </ListItem>
                                {/* <Divider /> */}
                                <ListItem disablePadding>
                                    <ListItemButton disabled={true}>
                                        <ListItemIcon>
                                            <RateReviewIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Write Review" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={handleBookNowModalClick}
                                    >
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
            {bookNowClicked && (
                <BookNowModal
                    openBookNowModal={openBookNowModal}
                    handleCloseBookNowModal={handleCloseBookNowModal}
                    handleBookNowButtonClick={handleBookNowButtonClick}
                    handleServiceDate={handleServiceDate}
                    customerDetails={customerDetails}
                    handleCreateOrder={handleCreateOrder}
                />
            )}

            {showOrderConfirmationModal && (
                <OrderConfirmationModal
                    orderConfirmationModalOpen={orderConfirmationModalOpen}
                    handleOrderConfirmationModal={handleOrderConfirmationModal}
                    orderDetails={{
                        ...customerDetails,
                        orderId: data?.createOrder.id,
                        address: `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.state} - ${customerDetails.zipCode}`,
                    }}
                />
            )}
        </Box>
    );
};

export default BusinessDetails;
