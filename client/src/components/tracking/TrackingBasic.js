import React, { Component } from 'react';
import './TrackingBasic.css';

class TrackingBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
        initMap();
    }
    componentWillReceiveProps() {
    }
    render() {
        return (
            <div>
                <div id="floating-panel">
                    {/*
            <input id="start" className="controls" type="text" placeholder="Enter an origin location"/>
            <input id="end" className="controls" type="text" placeholder="Enter a destination location"/>
        */}
                </div>
                <div id="right-panel"></div>
                <div id="map"></div>
            </div>
        );
    }
}

let trackingComponent = null;

var directionsDisplay = null;
var directionsService = null;
var map = null;

function initMap(localDrivers) {
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsService = new google.maps.DirectionsService;
    var trafficLayer = new google.maps.TrafficLayer();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.523573,
            lng: -121.983625
        },
        zoom: 9
    });
    trafficLayer.setMap(map);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));

    new AutocompleteDirectionsHandler(map);

    var control = document.getElementById('floating-panel');

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
}

function AutocompleteDirectionsHandler(map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'DRIVING';
    var originInput = document.getElementById('start');
    var destinationInput = document.getElementById('end');
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);

    var originAutocomplete = new google.maps.places.Autocomplete(
        originInput, { placeIdOnly: true });
    var destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput, { placeIdOnly: true });

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
}



AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
        } else {
            me.destinationPlaceId = place.place_id;
        }
        me.route();
    });

};

AutocompleteDirectionsHandler.prototype.route = function () {
    var me = this;
    this.directionsService.route({
        origin: { 'placeId': this.originPlaceId },
        destination: { 'placeId': this.destinationPlaceId },
        travelMode: this.travelMode
    }, function (response, status) {
        if (status === 'OK') {
            //
            if (me.directionsDisplay != null) {
                me.directionsDisplay.setMap(null);
                me.directionsDisplay.setPanel(null);
                me.directionsDisplay = null;
                me.directionsDisplay = new google.maps.DirectionsRenderer;
                me.directionsDisplay.setMap(me.map);
                document.getElementById('right-panel').innerHTML = "";
                me.directionsDisplay.setPanel(document.getElementById('right-panel'));
            }
            //
            me.directionsDisplay.setDirections(response);
            var dirtyDistance = response.routes[0].legs[0].distance.text;
            var dirtyDuration = response.routes[0].legs[0].duration.text;
            var cleanDistance = dirtyDistance.replace(' mi', '');
            var cleanDuration = dirtyDuration.replace(' mins', '');

        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
};

export default TrackingBasic;