import React, { Component } from "react";
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
                <div>
                    <h6>{selectedPlace.name}</h6>
                </div>
            );
        } else {
            return (
                <div>
                    <h6>Business</h6>
                    <p>Name: {selectedPlace.name}</p>
                    <p>Address: {selectedPlace.address1}</p>
                    <p>City: {selectedPlace.city}</p>
                    <p>Rating: {selectedPlace.rating}</p>
                    <p>
                        Open Now: {selectedPlace.isOpenNow ? "Open" : "Closed"}
                    </p>
                </div>
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
