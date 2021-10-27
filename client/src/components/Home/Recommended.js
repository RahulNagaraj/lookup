import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const RecommendedEvents = (props) => {
    return (
        <Box sx={{ backgroundColor: blueGrey[200], p: 5 }} id="recommended">
            <Container sx={{ my: 5 }}>
                <Typography
                    textAlign={"center"}
                    gutterBottom
                    variant="h4"
                    component="div"
                >
                    Recommended Events
                </Typography>
                <Grid container spacing={2}>
                    {props.recommendedEvents.map((event) => (
                        <Grid item md={3} key={event.title}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        width="250"
                                        image={`/static/images/${event.imagePath}`}
                                        alt={""}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="body1"
                                            component="div"
                                        >
                                            {event.title} at{" "}
                                            <em>{event.location}</em>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

RecommendedEvents.propTypes = {
    recommendedEvents: PropTypes.array.isRequired,
};

export default RecommendedEvents;
