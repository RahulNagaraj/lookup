import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";

const SignUpButton = styled(Button)(() => ({
    color: "#FFF",
    backgroundColor: indigo[900],
    "&:hover": {
        backgroundColor: indigo[400],
        color: "#000",
    },
}));

export default SignUpButton;
