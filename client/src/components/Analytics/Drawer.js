import * as React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

export const DRAWER_ITEMS = [
    "Number of Requests Per Year",
    "Type of Requests",
    "Zipcode - Number of Requests",
    "City - Service Type",
    "Most Influential Business",
    "Most Influential People",
    "Most Influential Community",
];

const Drawer = (props) => {
    return (
        <Box>
            <List>
                {DRAWER_ITEMS.map((text, index) => (
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
