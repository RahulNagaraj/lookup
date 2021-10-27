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
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        width="250"
                                        image={`/static/images/${trend.imagePath}`}
                                        alt={""}
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
                                            {trend.recent === "new" && (
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
                                            )}
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
};

export default Trending;
