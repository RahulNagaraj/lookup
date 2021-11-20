import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Input,
    FilledInput,
    Select,
    MenuItem,
    Autocomplete,
    TextField,
    CircularProgress,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { blueGrey } from "@mui/material/colors";
import { useQuery } from "@apollo/client";
import { YelpQuery } from "../../graphql";
import yelpClient from "../../redux/services/yelp";
import { businessesRequest } from "../../redux/actions/businessActions";

const TitleHeader = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [searchText, setSearchText] = React.useState("");

    const businessState = useSelector((state) => state.businesses);

    const businesses = businessState.businesses.filter(
        (business) => business.location.city === props.location.value
    );

    React.useEffect(() => {
        if (
            !businessState.isFetching &&
            businessState.businesses.length === 0
        ) {
            dispatch(businessesRequest());
        }
    }, [businessState]);

    const handleOnChange = (event) => {
        const term = event.target.value;
        setSearchText(term);
    };

    const handleOnInputChange = (event) => {
        // const business = data?.search?.business[event.target.value];
        // history.push({
        //     pathname: "/business-detail",
        //     state: business,
        // });
    };

    const filterOptions = (options, { inputValue }) => {
        return options.filter(
            (option) =>
                option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
                option.location.city === props.location.value
        );
    };

    return (
        <Box
            sx={{
                backgroundColor: blueGrey[100],
                height: "auto",
                p: 5,
            }}
        >
            <Box sx={{ alignItems: "center", mb: 5 }} textAlign={"center"}>
                <Typography variant="h1" component="div" gutterBottom>
                    Lookup
                </Typography>
                <Typography
                    variant="body1"
                    component="div"
                    gutterBottom
                    sx={{ fontSize: "22px" }}
                >
                    A one-stop shop for all your home services.
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
                <FormControl variant="standard" sx={{ minWidth: 200, mr: 1 }}>
                    <InputLabel sx={{ p: 1 }} id="city-label">
                        City
                    </InputLabel>
                    <Select
                        labelId="city-label"
                        id="city-select"
                        value={props.location.value}
                        label="City"
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
                <FormControl variant="filled">
                    <InputLabel id="zipcode-label">Zip Code</InputLabel>
                    <FilledInput labelId="zipcode-label" id="zipcode-input" />
                </FormControl>

                {/* <Autocomplete
                    id="autocomplete"
                    autoHighlight
                    options={businessState.businesses}
                    filterOptions={(x) => x}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: "40vw", ml: 1 }}
                    loading={businessState.isFetching}
                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search"
                            placeholder="Search for a service..."
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {businessState.isFetching ? (
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
                /> */}
                <Autocomplete
                    id="autocomplete"
                    autoHighlight
                    disableClearable
                    sx={{ width: "40vw", ml: 1 }}
                    options={businesses}
                    getOptionLabel={(option) => option.name}
                    filterOptions={filterOptions}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search for a service..."
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
