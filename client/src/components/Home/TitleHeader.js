import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    FilledInput,
    Select,
    MenuItem,
    Autocomplete,
    TextField,
    CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { blueGrey } from "@mui/material/colors";
import { businessesRequest } from "../../redux/actions/businessActions";
import {
    setSearchField,
    filterBusinessesSearchRequest,
    setSearchLogCityEntry,
    setSearchLogZipcodeEntry,
    setSearchLogBusinessCityEntry,
    setSearchLogBusinessZipcodeEntry,
} from "../../redux/actions/searchActions";

const TitleHeader = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const businessState = useSelector((state) => state.businesses);
    const searchState = useSelector((state) => state.search);
    const userState = useSelector((state) => state.user);

    const {
        searchFields: { city, zipcode },
        isFetching,
        filteredBusinesses,
    } = searchState;
    const { businesses } = businessState;

    React.useEffect(() => {
        if (
            !businessState.isFetching &&
            businessState.businesses.length === 0
        ) {
            dispatch(businessesRequest());
        }
    }, [businessState]);

    const handleOnInputChange = (business) => {
        if (userState.isLoggedIn) {
            dispatch(
                setSearchLogBusinessCityEntry(
                    userState.userDetails.id,
                    business.location.city
                )
            );
            dispatch(
                setSearchLogBusinessZipcodeEntry(
                    userState.userDetails.id,
                    business.location.zip_code
                )
            );
        }
        history.push({
            pathname: "/business-detail",
            state: business,
        });
    };

    const handleCityOnBlur = (city) => {
        dispatch(filterBusinessesSearchRequest(city.value, zipcode));
        if (userState.isLoggedIn) {
            dispatch(
                setSearchLogCityEntry(userState.userDetails.id, city.value)
            );
        }
    };

    const handleZipcodeOnBlur = (city) => {
        dispatch(filterBusinessesSearchRequest(city.value, zipcode));
        if (userState.isLoggedIn) {
            dispatch(
                setSearchLogZipcodeEntry(userState.userDetails.id, zipcode)
            );
        }
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
                <FormControl variant="standard" sx={{ minWidth: 200 }}>
                    <InputLabel sx={{ p: 1 }} id="city-label">
                        City
                    </InputLabel>
                    <Select
                        labelId="city-label"
                        id="city-select"
                        value={city.value}
                        label="City"
                        variant="filled"
                        onBlur={() => handleCityOnBlur(city)}
                    >
                        {props.locations.map((loc) => (
                            <MenuItem
                                key={loc.key}
                                value={loc.value}
                                onClick={() =>
                                    dispatch(setSearchField("city", loc))
                                }
                            >
                                {loc.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box display="flex" alignItems="center" sx={{ mx: 1 }}>
                    <Typography variant="body1">OR</Typography>
                </Box>

                <FormControl variant="filled">
                    <InputLabel id="zipcode-label">Zip Code</InputLabel>
                    <FilledInput
                        labelId="zipcode-label"
                        id="zipcode-input"
                        value={zipcode}
                        onChange={(e) =>
                            dispatch(setSearchField("zipcode", e.target.value))
                        }
                        onBlur={() => handleZipcodeOnBlur(city)}
                    />
                </FormControl>

                <Autocomplete
                    id="autocomplete"
                    autoHighlight
                    options={
                        filteredBusinesses.length > 0
                            ? filteredBusinesses
                            : businesses
                    }
                    getOptionLabel={(option) => option.name}
                    sx={{ width: "40vw", ml: 3 }}
                    loading={businessState.isFetching || isFetching}
                    isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                    }
                    onChange={(e, newValue) => {
                        handleOnInputChange(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search"
                            placeholder="Search for a service..."
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {businessState.isFetching ||
                                        isFetching ? (
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

                {/* <Autocomplete
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
                /> */}
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
