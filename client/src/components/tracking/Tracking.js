import React, { Component } from 'react';
import './Tracking.css';

class Tracking extends Component {
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
      oldMarkers: []
    };
    this.removeOldMarkers = this.removeOldMarkers.bind(this);
    this.displayNewMarkers = this.displayNewMarkers.bind(this);
  }

  componentWillMount(){
    this.setState({
      localDrivers: this.props.localDrivers
      // localDrivers: {
      //   2: {lat: 37.523573, lng: -121.983625}
      // }
    });
  }

  componentDidMount() {
    initMap(this.state.localDrivers);
  }        

  componentWillReceiveProps() {
    this.removeOldMarkers();
    this.displayNewMarkers();
  }

  componentWillUnmount() {
    trackingComponent = null;
    directionsDisplay = null;
    directionsService = null;
    map = null;
  }

  removeOldMarkers() {
    if (this.state.oldMarkers.length !== 0){
        for (var oldMarker of this.state.oldMarkers) {
        oldMarker.setMap(null);
      }
      this.setState({
        oldMarkers: []
      });
    }
  }

  displayNewMarkers() {
    if (this.state.localDrivers !== null) {
      var oldMarkers = [];
      for (var driverKey in this.state.localDrivers) {
        var driverLatLng = new google.maps.LatLng(this.state.localDrivers[driverKey]);
        var marker = new google.maps.Marker({
          position: driverLatLng,
          map: map,
          icon: 'http://yava.ro/icons/car.png'
        });
        oldMarkers.push(marker);
      }
      this.setState({
        oldMarkers: oldMarkers
      });
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

  var trackingComponent = null;

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
            // for (var driverKey in localDrivers) {
            //   var marker = new google.maps.Marker({
            //     position: new google.maps.LatLng(localDrivers[driverKey]),
            //     map: map
            //   });
            //   console.log(localDrivers[driverKey]);
            // }
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

            //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
            //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
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
                    trackingComponent.setState({
                      pickupID: place.place_id,
                      pickupAddress: place.name
                    });
                } else {
                    me.destinationPlaceId = place.place_id;
                    trackingComponent.setState({
                      destinationID: place.place_id,
                      destinationAddress: place.name
                    });
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
                      //me.map = null;
                      me.directionsDisplay = new google.maps.DirectionsRenderer;
                      // me.map = new google.maps.Map(document.getElementById('map'), {
                      // center: {
                      //     lat: 37.523573,
                      //     lng: -121.983625
                      //     },
                      //     zoom: 9
                      // });
                      me.directionsDisplay.setMap(me.map);
                      document.getElementById('right-panel').innerHTML = "";
                      me.directionsDisplay.setPanel(document.getElementById('right-panel'));
                    }
                    //
                    me.directionsDisplay.setDirections(response);
                    var dirtyDistance = response.routes[0].legs[0].distance.value;
                    var dirtyDuration = response.routes[0].legs[0].duration.value;
                    var cleanDistance = dirtyDistance * 0.000621371192;
                    var cleanDuration = dirtyDuration / 60;
                    trackingComponent.setState({distance: cleanDistance.toFixed(1)});
                    trackingComponent.setState({duration: cleanDuration.toFixed()});
                    calculateAndSetCost(cleanDistance);

                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        };

        function calculateAndSetCost(distance) {
          var rate = 2.7;
          var cost = 0;
          if (distance > 2) {
            cost = (distance - 2) * rate;
          }
          if (cost < 15) {
            cost = 15;
          }
          trackingComponent.setState({cost: cost.toFixed(2)});
        }


export default Tracking;