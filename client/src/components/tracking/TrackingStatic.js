import React, { Component } from 'react';

class TrackingStatic extends Component {
  constructor(props) {
    super(props);

    if (!trackingComponent) { trackingComponent = this; }

    this.state = {
      pickupAddress: '',
      destinationAddress: '',
      pickupID: '',
      destinationID: '',
      distance: '',
      duration: '',
      cost: '',
      localDrivers: {},
      oldMarkers: [],
      currentLocationLatLng: '',
      targetLocationPlaceId: ''
    };
    this.removeOldMarkers = this.removeOldMarkers.bind(this);
    this.displayNewMarkers = this.displayNewMarkers.bind(this);
  }

  componentWillMount() {
    // this.setState({
    //   currentLocationLatLng: this.props.currentLocationLatLng,
    //   targetLocationPlaceId: this.props.targetLocationPlaceId
    // });
  }

  componentDidMount() {
    initMap();
    calcRoute(this.props.currentLocationLatLng, this.props.targetLocationPlaceId, this.props.riderPickupID2);
  }

  componentWillReceiveProps() {
    this.removeOldMarkers();
    this.displayNewMarkers();
    calcRoute(this.props.currentLocationLatLng, this.props.targetLocationPlaceId, this.props.riderPickupID2);
  }

  componentWillUnmount() {
    trackingComponent = null;
    directionsDisplay = null;
    directionsService = null;
    map = null;
    geocoder = null;
  }

  removeOldMarkers() {
    if (this.state.oldMarkers.length !== 0) {
      for (var oldMarker of this.state.oldMarkers) {
        oldMarker.setMap(null);
      }
      this.setState({
        oldMarkers: []
      });
    }
  }

  displayNewMarkers() {
    if (this.props.currentLocationLatLng !== null) {
      var oldMarkers = [];
      var driverLatLng = new google.maps.LatLng(this.props.currentLocationLatLng);
      var driverMarker = new google.maps.Marker({
        position: driverLatLng,
        map: map,
        icon: 'http://yava.ro/icons/car.png'
      });
      oldMarkers.push(driverMarker);

      geocoder.geocode({ 'placeId': this.props.targetLocationPlaceId }, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            var targetMarker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });
            oldMarkers.push(targetMarker);
            trackingComponent.setState({
              oldMarkers: oldMarkers
            });
          }
        }
      });

      if (this.props.riderPickupID2) {
        geocoder.geocode({ 'placeId': this.props.riderPickupID2 }, function (results, status) {
          if (status === 'OK') {
            if (results[0]) {
              var targetMarker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                icon: 'https://mt.google.com/vt/icon/name=icons/transit/tactile/triplabel/travelmode/walk.png&filter=b2ffffff&scale=2'
              });
              oldMarkers.push(targetMarker);
              trackingComponent.setState({
                oldMarkers: oldMarkers
              });
            }
          }
        });
      }
    }
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
var geocoder = null;

function initMap() {
  directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
  directionsService = new google.maps.DirectionsService();
  var trafficLayer = new google.maps.TrafficLayer();
  geocoder = new google.maps.Geocoder;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 37.523573,
      lng: -121.983625
    },
    zoom: 9
  });
  trafficLayer.setMap(map);
  directionsDisplay.setMap(map);
}

function calcRoute(currentLocationLatLng, targetLocationPlaceId, riderPickupID2) {
  var start = new google.maps.LatLng(currentLocationLatLng);
  var end = { placeId: targetLocationPlaceId };
  var waypointArray = [];
  var request = {};
  if (riderPickupID2 !== null) {
    waypointArray = [{ stopover: true, location: { placeId: riderPickupID2 } }];
    request = {
      origin: start,
      destination: end,
      waypoints: waypointArray,
      travelMode: 'DRIVING'
    };
  } else {
    request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    };
  }
  directionsService.route(request, function (result, status) {

    if (status == 'OK') {
      // var coords = result.routes[0].overview_path;
      // alert(coords);
      // console.log(coords);
      directionsDisplay.setPanel(document.getElementById('right-panel'));
      directionsDisplay.setDirections(result);

    }
  });
}


export default TrackingStatic;