import React from "react";
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

const ServiceCards = (props) => {
    const [pagination, setPagination] = React.useState({
        totalItems: props.businesses.length,
        numberOfPages: props.businesses.length / 5,
        page: 1,
        items: props.businesses.slice((1 - 1) * 5, (1 - 1) * 5 + 5),
    });

    const updatePage = (event, value) => {
        setPagination({
            ...pagination,
            page: value,
            items: props.businesses.slice((value - 1) * 5, (value - 1) * 5 + 5),
        });
    };

    return (
        <Box
            component="main"
            display="flex"
            justifyContent="center"
            sx={{ mt: 1, mb: 5 }}
        >
            <Container>
                {pagination.items.map((business) => (
                    <Card sx={{ minWidth: 350, minHeight: 200 }} sx={{ mt: 2 }}>
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
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                This impressive paella is a perfect party dish
                                and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the
                                mussels, if you like.
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

                <Box sx={{ mt: 2 }} display="flex" justifyContent="flex-end">
                    <Pagination
                        count={pagination.numberOfPages}
                        page={pagination.page}
                        onChange={updatePage}
                        color="secondary"
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default ServiceCards;
