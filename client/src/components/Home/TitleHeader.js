import React from "react";
import PropTypes from "prop-types";
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    TextField,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const TitleHeader = (props) => {
    return (
        <Box
            sx={{
                backgroundColor: blueGrey[100],
                height: "45vh",
            }}
        >
            <Box
                sx={{ mx: 5, alignItems: "center", mb: 5 }}
                textAlign={"center"}
            >
                <Typography variant="h1" component="div" gutterBottom>
                    Lookup
                </Typography>
                <Typography variant="body1" component="div" gutterBottom>
                    body1. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Quos blanditiis tenetur unde suscipit
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
                <FormControl variant="standard" sx={{ minWidth: 200, mr: 1 }}>
                    <InputLabel sx={{ pl: 1 }} id="demo-simple-select-label">
                        Location
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.location.value}
                        label="Location"
                        variant="filled"
                    >
                        {props.locations.map((loc) => (
                            <MenuItem
                                key={loc.key}
                                value={loc.value}
                                onClick={() => props.handleLocation(loc)}
                            >
                                {loc.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Autocomplete
                    id="free-solo-2-demo"
                    disableClearable
                    autoHighlight
                    autoSelect
                    options={props.services.map((service) => service.title)}
                    sx={{ width: "40vw", ml: 1 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search"
                            placeholder="Search for a service/product..."
                            InputProps={{
                                ...params.InputProps,
                                type: "search",
                            }}
                            variant="filled"
                        />
                    )}
                />
            </Box>
        </Box>
    );
};

TitleHeader.propTypes = {
    location: PropTypes.object.isRequired,
    handleLocation: PropTypes.func.isRequired,
    locations: PropTypes.array.isRequired,
    services: PropTypes.array.isRequired,
};

export default TitleHeader;
