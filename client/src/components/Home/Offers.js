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
import { blue } from "@mui/material/colors";

const Offers = (props) => {
    return (
        <Box sx={{ p: 5 }} id={"offers"}>
            <Container sx={{ my: 5 }}>
                <Typography
                    textAlign={"center"}
                    gutterBottom
                    variant="h4"
                    component="div"
                >
                    Best Offers
                </Typography>
                <Grid container spacing={2}>
                    {props.offers.map((offer) => (
                        <Grid item md={4} key={offer.title}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        width="250"
                                        image={`/static/images/${offer.imagePath}`}
                                        alt={""}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="body1"
                                            component="div"
                                        >
                                            {offer.title}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            sx={{
                                                color: blue["A200"],
                                            }}
                                        >
                                            {offer.offer}
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

Offers.propTypes = {
    offers: PropTypes.array.isRequired,
};

export default Offers;
