import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const LoginButton = styled(Button)(() => ({
    color: "#FFF",
    backgroundColor: grey[900],
    "&:hover": {
        backgroundColor: grey[400],
        color: "#000",
    },
}));

export default LoginButton;
