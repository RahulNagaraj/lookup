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
    Skeleton,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const Services = (props) => {
    return (
        <Box sx={{ backgroundColor: blueGrey[200], p: 5 }} id="services">
            <Container sx={{ marginTop: 5, marginBottom: 5 }}>
                <Typography
                    textAlign={"center"}
                    gutterBottom
                    variant="h4"
                    component="div"
                >
                    Services
                </Typography>

                <Grid container spacing={2}>
                    {props.homeServices.map((service) => (
                        <Grid item md={3} key={service.title}>
                            <Card
                                onClick={() =>
                                    props.handleCardClick(
                                        service.title,
                                        service.alias
                                    )
                                }
                            >
                                <CardActionArea>
                                    {props.loading ? (
                                        <Skeleton
                                            sx={{ height: 200 }}
                                            animation="wave"
                                            variant="rectangular"
                                        />
                                    ) : (
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            width="200"
                                            image={`/static/images/${service.alias}.jpg`}
                                            alt={service.title}
                                        />
                                    )}

                                    <CardContent>
                                        {props.loading ? (
                                            <React.Fragment>
                                                <Skeleton
                                                    animation="wave"
                                                    height={10}
                                                    style={{ marginBottom: 6 }}
                                                />
                                                <Skeleton
                                                    animation="wave"
                                                    height={10}
                                                    width="80%"
                                                />
                                            </React.Fragment>
                                        ) : (
                                            <Typography
                                                gutterBottom
                                                variant="body1"
                                                component="div"
                                            >
                                                {service.title}
                                            </Typography>
                                        )}
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

Services.propTypes = {
    homeServices: PropTypes.array.isRequired,
    handleCardClick: PropTypes.func.isRequired,
};

export default Services;
