import React from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Avatar,
    CardHeader,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const TwitterMatches = (props) => {
    return (
        <Box sx={{ backgroundColor: blueGrey[200], p: 5 }} id="twitterMatches">
            <Container sx={{ my: 5 }}>
                <Typography
                    textAlign={"center"}
                    gutterBottom
                    variant="h4"
                    component="div"
                >
                    Twitter Matches
                </Typography>
                <Grid container spacing={2}>
                    {props.matches.map((match, index) => (
                        <Grid item md={4} key={index}>
                            <Card onClick={() => {}}>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            aria-label="user"
                                            src={
                                                match.user
                                                    .profile_image_url_https
                                            }
                                        ></Avatar>
                                    }
                                    title={match.user.name}
                                />
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Deal of the Day
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {match.text}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        href={match.entities.urls[0].url}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default TwitterMatches;
