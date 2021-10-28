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
    Paper,
    Button,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { blue } from "@mui/material/colors";

const CustomCard = (props) => {
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="450"
                    image={
                        props.offer.photos.length > 0
                            ? props.offer.photos[0]
                            : ""
                    }
                    alt={props.offer.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                        {props.offer.name}
                    </Typography>
                    <Typography
                        variant="caption"
                        display="block"
                        sx={{
                            color: blue["A200"],
                        }}
                    >
                        $50 OFF
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

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
                    Best Deals
                </Typography>
                <Carousel>
                    {props.offers.map((offer, i) => (
                        <CustomCard key={i} offer={offer} />
                    ))}
                </Carousel>
            </Container>
        </Box>
    );
};

Offers.propTypes = {
    offers: PropTypes.array.isRequired,
};

export default Offers;
