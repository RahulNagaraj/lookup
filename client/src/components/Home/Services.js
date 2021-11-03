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

const Services = (props) => {
    return (
        <Box sx={{ p: 5 }} id="services">
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
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        width="200"
                                        // image={`/static/images/${service.imagePath}`}
                                        alt={service.title}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="body1"
                                            component="div"
                                        >
                                            {service.title}
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

Services.propTypes = {
    homeServices: PropTypes.array.isRequired,
    handleCardClick: PropTypes.func.isRequired,
};

export default Services;
