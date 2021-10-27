import React from "react";
import { BottomNavigation, Container, Paper, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const Footer = () => {
    return (
        <Container sx={{ mt: 5 }}>
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <BottomNavigation
                    sx={{ bgcolor: blueGrey[50] }}
                    value=""
                    label=""
                    showLabel={false}
                    onChange={() => {}}
                >
                    <Typography sx={{ m: 2 }} variant="body1" component="div">
                        Made with ❤ using React
                    </Typography>
                </BottomNavigation>
            </Paper>
        </Container>
    );
};

export default Footer;
