import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

import Map from "./Map";
import BookNowModal from "./BookNowModal";
import AddReviewModal from "./AddReviewModal";
import OrderConfirmationModal from "./OrderConfirmationModal";
import { constructPlacesObject } from "../../common/util";
import { BookNowQuery } from "../../graphql";
import {
    reviewsRequest,
    addReviewRequest,
} from "../../redux/actions/businessActions";

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
        <Card sx={{ my: 1 }}>
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
    const dispatch = useDispatch();
    const businessesState = useSelector((state) => state.businesses);
    const userState = useSelector((state) => state.user);

    const business = history.location.state;

    const [bookNowClicked, setBookNow] = React.useState(false);
    const [openBookNowModal, setOpenBookNowModal] = React.useState(false);
    const [addReviewClicked, setAddReview] = React.useState(false);
    const [openAddReviewModal, setAddReviewModal] = React.useState(false);
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

    const [reviewDetails, setReviewDetails] = React.useState({
        business_id: business.id,
        text: "",
        time_created: new Date(),
        rating: null,
        user: {
            name: userState?.userDetails?.name || "Rahul",
        },
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
        const userId = userState.userDetails.id;
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

    const handleAddReviewModalClick = () => {
        setReviewDetails({
            business_id: business.id,
            text: "",
            time_created: new Date(),
            rating: null,
            user: {
                name: userState?.userDetails?.name || "Rahul",
            },
        });
        setAddReview(!addReviewClicked);
        setAddReviewModal(true);
    };

    const handleCloseBookNowModal = () => {
        setBookNow(!bookNowClicked);
        setOpenBookNowModal(false);
    };

    const handleCloseAddReviewModal = () => {
        setAddReview(!addReviewClicked);
        setAddReviewModal(false);
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

    const handleSetReviewDetail = (e) => {
        setReviewDetails({
            ...reviewDetails,
            [e.target.name]: e.target.value,
            time_created: new Date(),
        });
    };

    const handleAddReview = () => {
        dispatch(addReviewRequest(reviewDetails));
        handleCloseAddReviewModal();
    };

    const location = {
        coordinates: {
            lat: business.coordinates.latitude,
            lng: business.coordinates.longitude,
        },
    };

    React.useEffect(() => {
        if (
            !businessesState.isFetching &&
            businessesState.reviews.length === 0
        ) {
            dispatch(reviewsRequest(business.id));
        }
    }, [businessesState]);

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
                        <Typography variant="h6">Photos</Typography>
                        <Grid container spacing={1}>
                            {business.photos.map((photo) => (
                                <Grid item xs={3}>
                                    <Card sx={{ maxWidth: 200 }}>
                                        <CardMedia
                                            component="img"
                                            alt={business.name}
                                            height="200"
                                            src={photo}
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Divider sx={{ my: 2 }} />
                        <Box>
                            <Typography variant="h6">Top Reviews</Typography>
                            {businessesState.reviews.map((review, i) => (
                                <Review key={i} review={review} />
                            ))}
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ minHeight: 400 }}>
                            <Typography variant="h6">Location</Typography>
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                    <Card
                                        sx={{
                                            maxHeight: 400,
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        <CardContent sx={{ padding: 0 }}>
                                            <Map
                                                location={location}
                                                places={constructPlacesObject([
                                                    business,
                                                ])}
                                                showCurrentLocation={false}
                                                zoom={15}
                                                containerStyles={{
                                                    width: "33%",
                                                    height: "50%",
                                                }}
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
                                    <ListItemButton
                                        onClick={handleAddReviewModalClick}
                                    >
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

            {addReviewClicked && (
                <AddReviewModal
                    openAddReviewModal={openAddReviewModal}
                    handleCloseAddReviewModal={handleCloseAddReviewModal}
                    reviewDetails={reviewDetails}
                    handleSetReviewDetail={handleSetReviewDetail}
                    handleAddReview={handleAddReview}
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
