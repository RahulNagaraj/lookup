import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    Container,
    Typography,
    Card,
    CardActions,
    CardMedia,
    CardHeader,
    Avatar,
    IconButton,
    Pagination,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const itemsPerPage = 5;

const ServiceCards = (props) => {
    const [pagination, setPagination] = React.useState({
        totalItems: props.businesses.length,
        numberOfPages: Math.floor(props.businesses.length / itemsPerPage),
        page: 1,
        items: props.businesses.slice(0, itemsPerPage),
    });

    React.useEffect(() => {
        const numPages = Math.floor(props.businesses.length / itemsPerPage);
        setPagination({
            totalItems: props.businesses.length,
            numberOfPages: numPages < 1 ? 1 : numPages,
            page: 1,
            items: props.businesses.slice(0, itemsPerPage),
        });
    }, [props.businesses]);

    const updatePage = (event, value) => {
        setPagination({
            ...pagination,
            page: value,
            items: props.businesses.slice(
                (value - 1) * itemsPerPage,
                (value - 1) * itemsPerPage + itemsPerPage
            ),
        });
    };

    if (props.businesses.length === 0) {
        return (
            <Box textAlign="center">
                <Typography variant="h4">No Data available</Typography>
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
                {pagination.items.map((business) => (
                    <Card
                        key={business.name}
                        sx={{ mt: 2, minWidth: 350, minHeight: 200 }}
                        onClick={() => props.handleBusinesCardClick(business)}
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
                                          .map((cat) => `${cat.title}`)
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

                {props.businesses.length > 0 && (
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

ServiceCards.propTypes = {
    businesses: PropTypes.array.isRequired,
    handleBusinesCardClick: PropTypes.func.isRequired,
};

export default ServiceCards;
