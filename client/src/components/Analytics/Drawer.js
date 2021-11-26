import * as React from "react";
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

const items = [
    "Number of Requests Per Year",
    "Type of Requests",
    "Zipcode - Number of Requests",
    "City - Service Type",
];

const Drawer = (props) => {
    return (
        <Box>
            <List>
                {items.map((text, index) => (
                    <ListItem
                        button
                        key={text}
                        selected={props.chartSelected === text}
                        onClick={() => props.handleDrawerButtonClick(text)}
                    >
                        <ListItemIcon>{props.getIcon(text)}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Drawer;
