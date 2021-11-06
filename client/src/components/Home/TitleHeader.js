import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    TextField,
    CircularProgress,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useQuery } from "@apollo/client";
import { YelpQuery } from "../../graphql";
import yelpClient from "../../services/yelp";

const TitleHeader = (props) => {
    const history = useHistory();
    const [searchText, setSearchText] = React.useState("");

    const { loading, error, data } = useQuery(YelpQuery.SEARCH_SERVICE, {
        client: yelpClient,
        variables: {
            term: searchText,
            location: props.location.value,
            categories: "homeservices",
            limit: 50,
        },
    });

    const handleOnChange = (event) => {
        const term = event.target.value;
        setSearchText(term);
    };

    const handleOnInputChange = (event) => {
        const business = data?.search?.business[event.target.value];
        history.push({
            pathname: "/business-detail",
            state: business,
        });
    };

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
                    id="autocomplete"
                    autoHighlight
                    options={data ? data?.search?.business : []}
                    filterOptions={(x) => x}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: "40vw", ml: 1 }}
                    loading={loading}
                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }
                    onChange={handleOnInputChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search"
                            placeholder="Search for a service..."
                            onChange={(e) => handleOnChange(e)}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? (
                                            <CircularProgress
                                                color="inherit"
                                                size={20}
                                            />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
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
