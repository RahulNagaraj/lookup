import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    Container,
    Typography,
    Card,
    CardActions,
    CardMedia,
    CardContent,
    CardHeader,
    Avatar,
    IconButton,
    Pagination,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const itemsPerPage = 5;

const getFormattedDate = (event) => {
    const timeStartDate = new Date(event.time_start);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    return timeStartDate.toLocaleDateString("en-US", options);
};

const EventCards = (props) => {
    const [pagination, setPagination] = React.useState({
        totalItems: props.events.length,
        numberOfPages: Math.floor(props.events.length / itemsPerPage),
        page: 1,
        items: props.events.slice(0, itemsPerPage),
    });

    React.useEffect(() => {
        const numPages = Math.floor(props.events.length / itemsPerPage);
        setPagination({
            totalItems: props.events.length,
            numberOfPages: numPages < 1 ? 1 : numPages,
            page: 1,
            items: props.events.slice(0, itemsPerPage),
        });
    }, [props.events]);

    const updatePage = (event, value) => {
        setPagination({
            ...pagination,
            page: value,
            items: props.events.slice(
                (value - 1) * itemsPerPage,
                (value - 1) * itemsPerPage + itemsPerPage
            ),
        });
    };

    if (props.events.length === 0) {
        return (
            <Box textAlign="center">
                <Typography variant="h4">No Events Nearby</Typography>
            </Box>
        );
    }

    return (
        <Box
            component="main"
            display="flex"
            justifyContent="center"
            sx={{ mb: 5 }}
        >
            <Container>
                {pagination.items.map((event) => (
                    <Card
                        key={event.name}
                        sx={{ mt: 2, minWidth: 350, minHeight: 200 }}
                        onClick={() => {}}
                    >
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ bgcolor: red[500] }}
                                    aria-label="recipe"
                                >
                                    {event.name[0]}
                                </Avatar>
                            }
                            title={event.name}
                            subheader={getFormattedDate(event)}
                        />
                        <CardMedia
                            component="img"
                            height="300"
                            image={event.image_url}
                            alt={event.name}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {event.description}
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

                {props.events.length > 0 && (
                    <Box
                        sx={{ mt: 2 }}
                        display="flex"
                        justifyContent="flex-end"
                    >
                        <Pagination
                            count={pagination.numberOfPages}
                            page={pagination.page}
                            onChange={updatePage}
                            color="secondary"
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default EventCards;
