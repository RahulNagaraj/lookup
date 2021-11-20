import React, { Component } from "react";
import { Box, Typography } from "@mui/material";
import {
    Map,
    GoogleApiWrapper,
    InfoWindow,
    Marker,
    Circle,
} from "google-maps-react";

const containerStyles = {
    width: "33%",
};

const mapStyles = {
    width: "100%",
    height: "100%",
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });
    };

    onClose = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    };

    renderData = () => {
        const { selectedPlace } = this.state;

        if (selectedPlace.currentLocation) {
            return (
                <Box>
                    <Typography variant="body1">
                        {selectedPlace.name}
                    </Typography>
                </Box>
            );
        } else {
            return (
                <Box>
                    <Typography variant="h6">Business</Typography>
                    <Typography variant="body2">
                        Name: {selectedPlace.name}
                    </Typography>
                    <Typography variant="body2">
                        Address: {selectedPlace.address1}
                    </Typography>
                    <Typography variant="body2">
                        City: {selectedPlace.city}
                    </Typography>
                    <Typography variant="body2">
                        Rating: {selectedPlace.rating}
                    </Typography>
                    <Typography variant="body2">
                        Open Now: {selectedPlace.isOpenNow ? "Open" : "Closed"}
                    </Typography>
                </Box>
            );
        }
    };

    /**lat: this.props.location.lat,
                    lng: this.props.location.lng, */

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={11}
                containerStyle={containerStyles}
                style={mapStyles}
                initialCenter={{
                    lat: this.props.location.coordinates.lat,
                    lng: this.props.location.coordinates.lng,
                }}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    currentLocation={true}
                    name={`You are here in ${this.props.location.value}`}
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                        scaledSize: new this.props.google.maps.Size(60, 60),
                    }}
                />
                {this.props.places.map((place) => (
                    <Marker
                        key={place.name}
                        onClick={this.onMarkerClick}
                        {...place}
                        position={{
                            lat: place.coordinates.latitude,
                            lng: place.coordinates.longitude,
                        }}
                    />
                ))}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    {this.renderData()}
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA0cIbrA9jhdvle0eL0JQnWgQTYFjjMD24",
})(MapContainer);