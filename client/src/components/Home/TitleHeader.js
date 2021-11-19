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
                    options={businessState.businesses.map(
                        (business) => business.name
                    )}
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
