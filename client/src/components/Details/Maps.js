import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import GoogleMapReact from "google-map-react";
import config from "../../common/config";

const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px;">
            ${place.name}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
            ${place.rating}
        </span>
        <span style="color: orange;">
            ${String.fromCharCode(9733).repeat(Math.floor(place.rating))}
        </span>
        <span style="color: lightgrey;">
            ${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}
        </span>
    </div>
        <div style="font-size: 14px; color: grey;">
            ${place.categories}
        </div>
        <div style="font-size: 14px; color: grey;">
            ${place.price}
        </div>
        <div style="font-size: 14px; color: green;">
            ${place.isOpenNow ? "Open" : "Closed"}
        </div>
    </div>
`;

const handleApiLoaded = (map, maps, places) => {
    const markers = [];
    const infowindows = [];

    places.forEach((place) => {
        markers.push(
            new maps.Marker({
                position: {
                    lat: place.coordinates.latitude,
                    lng: place.coordinates.longitude,
                },
                map,
            })
        );

        infowindows.push(
            new maps.InfoWindow({
                content: getInfoWindowString(place),
            })
        );
    });

    markers.forEach((marker, i) => {
        marker.addListener("click", () => {
            infowindows[i].open(map, marker);
        });
    });
};

const Map = ({ location, zoomLevel, places }) => {
    return (
        <Box sx={{ mt: 2, width: "100%", height: "80vh" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: config.GOOGLE_MAPS_API_KEY }}
                defaultCenter={location}
                defaultZoom={zoomLevel}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>
                    handleApiLoaded(map, maps, places)
                }
            />
        </Box>
    );
};

Map.propTypes = {
    location: PropTypes.object.isRequired,
    zoomLevel: PropTypes.number.isRequired,
    places: PropTypes.array.isRequired,
};

export default Map;
