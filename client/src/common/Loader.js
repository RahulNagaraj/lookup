import React from "react";
import { Box, Container, CircularProgress } from "@mui/material";

const Loader = () => {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "85vh",
                }}
            >
                <CircularProgress />
            </Box>
        </Container>
    );
};

export default Loader;
