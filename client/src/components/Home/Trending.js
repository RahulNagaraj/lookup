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
    CardActions,
} from "@mui/material";
import FiberNewOutlinedIcon from "@mui/icons-material/FiberNewOutlined";
import { blueGrey } from "@mui/material/colors";

const Trending = (props) => {
    return (
        <Box sx={{ backgroundColor: blueGrey[200], p: 5 }} id="trending">
            <Container sx={{ my: 5 }}>
                <Typography
                    textAlign={"center"}
                    gutterBottom
                    variant="h4"
                    component="div"
                >
                    Trending
                </Typography>
                <Grid container spacing={2}>
                    {props.trending.map((trend, index) => (
                        <Grid item md={4} key={index}>
                            <Card
                                onClick={() =>
                                    props.handleBusinessCardClick(trend)
                                }
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        width="250"
                                        image={
                                            trend.photos.length > 0
                                                ? trend.photos[0]
                                                : ""
                                        }
                                        alt={trend.name}
                                    />
                                    <CardContent>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            textAlign="center"
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="body1"
                                                component="div"
                                            >
                                                {trend.name}
                                            </Typography>
                                            <CardActions
                                                disableSpacing
                                                sx={{
                                                    p: 0,
                                                    mt: -2,
                                                }}
                                            >
                                                <FiberNewOutlinedIcon
                                                    fontSize="large"
                                                    color={"error"}
                                                />
                                            </CardActions>
                                        </Box>
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

Trending.propTypes = {
    trending: PropTypes.array.isRequired,
    handleBusinessCardClick: PropTypes.func.isRequired,
};

export default Trending;
