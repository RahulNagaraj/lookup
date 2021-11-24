import * as React from "react";
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
    Link,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    CardActions,
    Button,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LinkIcon from "@mui/icons-material/Link";

import { constructEventsPlacesObject } from "../../common/util";
import Map from "../../common/Map";

const EventDetails = (props) => {
    const history = useHistory();
    const event = history.location.state;

    const location = {
        coordinates: {
            lat: event.latitude,
            lng: event.longitude,
        },
    };

    const getFormattedDate = (date) => {
        const newDate = new Date(date);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };

        return newDate.toLocaleDateString("en-US", options);
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
                                        alt={event.name}
                                        height="100"
                                        image={event.image_url}
                                    />
                                </Card>
                            </Grid>
                            <Grid item sx={8}>
                                <Box>
                                    <Typography variant="h6">
                                        {event.name}
                                    </Typography>
                                    <Box sx={{ my: 1 }}>
                                        {event.cost && (
                                            <>
                                                <Typography variant="button">
                                                    Cost {event.cost}
                                                </Typography>
                                                <Divider
                                                    orientation="vertical"
                                                    component="span"
                                                    variant="middle"
                                                    sx={{ mx: 2 }}
                                                ></Divider>
                                            </>
                                        )}
                                        <Typography variant="button">
                                            Attending Count{" "}
                                            {event.attending_count}
                                        </Typography>
                                        <Divider
                                            orientation="vertical"
                                            component="span"
                                            variant="middle"
                                            sx={{ mx: 2 }}
                                        ></Divider>
                                        <Typography variant="button">
                                            Interested Count{" "}
                                            {event.interested_count}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant="button">
                                        {event.is_free
                                            ? "Free Event"
                                            : "Paid Event"}
                                    </Typography>
                                    {event.is_official ? (
                                        <>
                                            <Divider
                                                orientation="vertical"
                                                component="span"
                                                variant="middle"
                                                sx={{ mx: 2 }}
                                            ></Divider>
                                            <VerifiedIcon />
                                        </>
                                    ) : null}
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">Description</Typography>
                        <Typography variant="subtitle2">
                            {event.description}
                        </Typography>
                        <Box sx={{ my: 1 }}></Box>
                        <Typography variant="body1">
                            Event Start Time
                        </Typography>
                        <Typography variant="subtitle2">
                            {getFormattedDate(event.time_start)}
                        </Typography>
                        {event.time_end && (
                            <>
                                <Typography variant="body1">
                                    Event End Time
                                </Typography>
                                <Typography variant="subtitle2">
                                    {getFormattedDate(event.time_end)}
                                </Typography>
                            </>
                        )}
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
                                                places={constructEventsPlacesObject(
                                                    [event]
                                                )}
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
                                <Grid item sm={6} textAlign="center">
                                    <Typography variant="h6">
                                        Address
                                    </Typography>
                                    <Typography variant="body2">
                                        {`${event.location.display_address}`}
                                    </Typography>
                                </Grid>
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
                                    <ListItemButton
                                        href={event.event_site_url}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        underline="none"
                                        component="button"
                                        variant="body2"
                                    >
                                        <ListItemIcon>
                                            <LinkIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Visit Official Link" />
                                    </ListItemButton>
                                </ListItem>
                                {event.tickets_url && (
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            href={event.tickets_url}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            underline="none"
                                            component="button"
                                            variant="body2"
                                        >
                                            <ListItemIcon>
                                                <BookOnlineIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Book a ticket" />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </List>
                        </Box>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EventDetails;
