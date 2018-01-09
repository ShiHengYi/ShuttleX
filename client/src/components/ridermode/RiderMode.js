import React, { Component } from 'react';
import axios from 'axios';
import Tracking from '../tracking/Tracking';
import TrackingStatic from '../tracking/TrackingStatic';

var socket = io();

class RiderMode extends Component {
  constructor(props) {
    super(props);

    if (!riderModeComponent) { riderModeComponent = this; }

    this.state = {
       uID: 'riderblank',
       payment: this.props.payment,
       matchedDriverID: '',
       pickupAddress: '',
       destinationAddress: '',
       pickupID: '',
       destinationID: '',
       matchedWithDriver: false,
       goingToDestination: false,
       seatsNeeded: '',
       distance: '',
       duration: '',
       cost: '',
       driverDistanceFromPickup: '',
       driverDurationFromPickup: '',
       localDrivers: {
        //2: {lat: 'removeMe', lng: 'removeMePls'},
        //23: {lat: 233, lng: 323},
        //556: {lat: 123, lng: 321}
       },
       customTitle: '',
       customMessage: ''
      };

    this.estimateRide = this.estimateRide.bind(this);
    this.handleChangeSeatsNeeded = this.handleChangeSeatsNeeded.bind(this);
    this.matchWithDriverSolo = this.matchWithDriverSolo.bind(this);
    this.occupyDriverSeatsSolo = this.occupyDriverSeatsSolo.bind(this);
    this.createRideRequestSolo = this.createRideRequestSolo.bind(this);
    this.getMatchedDriverDistDur = this.getMatchedDriverDistDur.bind(this);

    this.matchWithDriverCarpool = this.matchWithDriverCarpool.bind(this);
    this.occupyDriverSeatsCarpool = this.occupyDriverSeatsCarpool.bind(this);
    this.createRideRequestCarpool = this.createRideRequestCarpool.bind(this);
  }

  componentDidUpdate() {
    this.getMatchedDriverDistDur();
  }

  componentWillMount() {
    console.log("Activating rider mode...");
    //console.log(this.props.uID);
    this.setState({
      uID: this.props.uID,
      payment: this.props.payment
    });
  }

  componentWillUnmount() {
    riderModeComponent = null;
  }

  componentDidMount() {
    console.log(this.props.uID);

    socket.on('driverCoords', (dcObj) => {
      var tempLocalDrivers = this.state.localDrivers;
      tempLocalDrivers[dcObj.dID] = {lat: dcObj.lat, lng: dcObj.lng};
      this.setState({
        localDrivers: tempLocalDrivers
      });
    });
    socket.on('removeDriverCoords', (driverID) => {
      console.log('attempting to remove driverID ' + driverID + 'from obj');
      var tempLocalDrivers = this.state.localDrivers;
      delete tempLocalDrivers[driverID];
      this.setState({
        localDrivers: tempLocalDrivers
      });
    });
    socket.on('pickedUpRider' + this.state.uID, () => {
      this.setState({
        goingToDestination: true
      });
    });
    socket.on('droppedOffRider' + this.state.uID, () => {
      axios.put('/api/v1/driver/seats/free/' + this.state.matchedDriverID, {
        freeSeats: {
          seatsNeeded: this.state.seatsNeeded
        }
      })
      .then(res => {
        if (res.status === 200) {
          axios.delete('/api/v1/riderequest/delete/' + this.state.matchedDriverID)
          .then((res) => {
            this.setState({
             matchedDriverID: '',
             pickupAddress: '',
             destinationAddress: '',
             pickupID: '',
             destinationID: '',
             matchedWithDriver: false,
             goingToDestination: false,
             seatsNeeded: '',
             distance: '',
             duration: '',
             cost: '',
             driverDistanceFromPickup: '',
             driverDurationFromPickup: ''
            });
          });
        }
      });
    });
  }

  getMatchedDriverDistDur() {
    if (this.state.matchedWithDriver === true) {
      var directionsService = new google.maps.DirectionsService;
      var driverLatLng = this.state.localDrivers[this.state.matchedDriverID];
      directionsService.route({
        origin: new google.maps.LatLng(driverLatLng),
        destination: {'placeId': this.state.pickupID},
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.setState({
            driverDistanceFromPickup: response.routes[0].legs[0].distance.text,
            driverDurationFromPickup: response.routes[0].legs[0].duration.text
          });
        }
      });
    }
  }

  handleChangeSeatsNeeded(event) {
    this.setState({
      seatsNeeded: event.target.value
    });
  }

  estimateRide() {
    if(this.state.payment){
    this.setState({
      pickupAddress: this.trackingComponent.state.pickupAddress,
      destinationAddress: this.trackingComponent.state.destinationAddress,
      distance: this.trackingComponent.state.distance,
      duration: this.trackingComponent.state.duration,
      cost: this.trackingComponent.state.cost
    });
    $('#exampleModal').modal('show');
    
  }else{
       $('#paymentModal').modal('show');
        return;
    //this.matchWithDriverSolo();
  }
  }

  matchWithDriverSolo() {
    axios.post('/api/v1/driver/find/solo', {
      riderequest: {
        seatsNeeded: this.state.seatsNeeded
      }
    })
    .then(res => {
      if (res.data.driverArray.length === 0) {
        this.setState({
          customTitle: "Oops, cannot find new driver",
          customMessage: "We couldn't find a driver for your new request. Drivers may be full capacity, busy with another request, or offline. Maybe you can carpool with an existing request."
        });
        $('#customModal').modal('show');
      } else {
        var durationArray = [];
        var finishCalc = durationArray.length === res.data.driverArray.length;
        res.data.driverArray.forEach((driver, index) => {
          var directionsService = new google.maps.DirectionsService();
          directionsService.route({
                origin: new google.maps.LatLng(riderModeComponent.state.localDrivers[driver.did]),
                destination: { 'placeId': riderModeComponent.trackingComponent.state.pickupID },
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') {
                  var dirtyDuration = response.routes[0].legs[0].duration.value;
                  var cleanDuration = dirtyDuration / 60;
                  durationArray[index] = cleanDuration;
                }
            });
        });
        if (!finishCalc) {
          $('#findingModal').modal('show');
          setTimeout(()=>{
            var min = 999;
            var minIndex = -1;
            for (var i = 0; i < durationArray.length; i++) {
              if (durationArray[i] < min) {
                min = durationArray[i];
                minIndex = i;
              }
            }
            if (min > 30) {
              $('#findingModal').modal('hide');
              riderModeComponent.setState({
                customTitle: "Oops, idle drivers are too far",
                customMessage: "We couldn't find a driver for your new request because they are farther than 30 minutes away from you."
              });
              $('#customModal').modal('show');
            } else {
              $('#findingModal').modal('hide');
              riderModeComponent.setState({
                customTitle: "Driver found!",
                customMessage: "Your map will render your matched driver's location to your pickup location."
              });
              $('#customModal').modal('show');
              riderModeComponent.setState({
                matchedDriverID: res.data.driverArray[minIndex].did
              });
              riderModeComponent.occupyDriverSeatsSolo();
            }    
          }, 5000);
        }
        
      }
      
    });

  }

  occupyDriverSeatsSolo() {
    $('#customModal').modal('hide');
    axios.put('/api/v1/driver/seats/occupy/' + this.state.matchedDriverID, {
      occupySeats: {
        seatsNeeded: this.state.seatsNeeded
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.createRideRequestSolo();
      }
    });
  }

  createRideRequestSolo() {
    axios.post('/api/v1/riderequest/create', {
      riderequest: {
        rid1: this.state.uID,
        rid2: null,
        did: this.state.matchedDriverID,
        pickup1: this.trackingComponent.state.pickupID,
        pickup2: null,
        dropoff: this.trackingComponent.state.destinationID
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.setState({
          pickupID: this.trackingComponent.state.pickupID,
          destinationID: this.trackingComponent.state.destinationID,
          matchedWithDriver: true
        });
        socket.emit('rideRequest', this.state.matchedDriverID);
      }
    });
  }

  
  matchWithDriverCarpool() {
    axios.post('/api/v1/driver/find/carpool', {
      riderequest: {
        seatsNeeded: this.state.seatsNeeded,
        destinationID: this.trackingComponent.state.destinationID
      }
    })
    .then(res => {
      if (res.data.driverArray.length === 0) {
        this.setState({
          customTitle: "Oops, cannot find existing ride to join",
          customMessage: "We did find rides going to your destination, but your pickup location is farther than 1 mile from their main route. Maybe you can try requesting a new ride."
        });
        $('#customModal').modal('show');
      } else {
        var directionsService = new google.maps.DirectionsService();
        var isCloseArray = [];
        var finishCalc = isCloseArray.length === res.data.driverArray.length;
        res.data.driverArray.forEach((driver, index) => {
          directionsService.route({
              origin: { 'placeId': driver.pickup1 },
              destination: { 'placeId': driver.dropoff },
              travelMode: 'DRIVING'
          }, function (response, statusDS) {
              if (statusDS === 'OK') {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'placeId': riderModeComponent.trackingComponent.state.pickupID}, function(results, statusGC) {
                  if (statusGC === 'OK') {
                      if (results[0]) {
                          var breakCheck = false;
                          var lessThanMileFlag = false;
                          var pickupLatLng = results[0].geometry.location;
                          for (var i = 0; i < response.routes[0].legs[0].steps.length; i++) {
                              for (var j = 0; j < response.routes[0].legs[0].steps[i].path.length; j++) {
                                  var legLatLng = response.routes[0].legs[0].steps[i].path[j];
                                  var rad = function(x) {
                                    return x * Math.PI / 180;
                                  };
                                  var getDistance = function(p1, p2) {
                                    var R = 6378137; // Earth’s mean radius in meter
                                    var dLat = rad(p2.lat() - p1.lat());
                                    var dLong = rad(p2.lng() - p1.lng());
                                    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                      Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
                                      Math.sin(dLong / 2) * Math.sin(dLong / 2);
                                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                                    var d = R * c;
                                    return d * 0.000621371; // returns the distance in miles
                                  };
                                  var thisDistance = getDistance(pickupLatLng, legLatLng);
                                  if (thisDistance <= 1) {
                                      lessThanMileFlag = true;
                                      breakCheck = true;
                                      break;
                                  }
                              }
                              if (breakCheck) {break;}
                          }
                          if (lessThanMileFlag) {
                              isCloseArray[index] = true;
                          } else {
                              isCloseArray[index] = false;
                          }
                      }
                  }
                });
              }
          });
        });
        if (!finishCalc) {
          $('#findingModal').modal('show');
          setTimeout(()=>{
            var minIndex = -1;
            for (var i = 0; i < isCloseArray.length; i++) {
              console.log('entered isCloseArray');
              if (isCloseArray[i] === true) {
                minIndex = i;
                break;
              }
            }
            if (minIndex === -1) {
              $('#findingModal').modal('hide');
              riderModeComponent.setState({
                customTitle: "Oops, existing driver's route too far",
                customMessage: "We couldn't find a carpool ride for you to join because your pickup location is more than a mile away from their current route. Maybe you can try requesting a new ride."
              });
              $('#customModal').modal('show');
            } else {
              $('#findingModal').modal('hide');
              riderModeComponent.setState({
                customTitle: "Carpool ride found!",
                customMessage: "Your map will render your matched driver's location to your pickup location. You will join an existing ride to your destination."
              });
              $('#customModal').modal('show');
              riderModeComponent.setState({
                matchedDriverID: res.data.driverArray[minIndex].did
              });
              riderModeComponent.occupyDriverSeatsCarpool();
            }    
          }, 5000);
        }
      }
      
    });
  }

  occupyDriverSeatsCarpool() {
    axios.put('/api/v1/driver/seats/occupy/' + this.state.matchedDriverID, {
      occupySeats: {
        seatsNeeded: this.state.seatsNeeded
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.createRideRequestCarpool();
      }
    });
  }

  createRideRequestCarpool() {
    axios.put('/api/v1/riderequest/modify/' + this.state.matchedDriverID, {
      riderequest: {
        rid2: this.state.uID,
        pickup2: this.trackingComponent.state.pickupID
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.setState({
          pickupID: this.trackingComponent.state.pickupID,
          destinationID: this.trackingComponent.state.destinationID,
          matchedWithDriver: true
        });
        socket.emit('secondRideRequest', this.state.matchedDriverID); /////////////////////
      }
    });
  }
  
  

render() {
  return (
      <div>
        <div>
          {/*<div className="btn btn-danger float-right" onClick={this.estimateRide}>Quit</div>*/}
        </div>
        <h2 className="form-signin-heading">Request Ride</h2>
      {/*Modal for Get Ride Estimate button */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ride Estimates</h5>
              
            </div>
            <div className="modal-body">
            {this.state.distance === '' || this.state.duration === '' || this.state.seatsNeeded === '' ?
              <div> 
              Some fields are blank.. 
              </div>

            :
              <div>
              Start: {this.state.pickupAddress} <br/>
              End: {this.state.destinationAddress} <br/> <br/>
              Distance: {this.state.distance} mile(s) <br/>
              Duration: {this.state.duration} minute(s) <br/>
              Cost: ${this.state.cost} <br/>

              <br/>
              Confirm your request by getting a new ride or joining an existing ride. Or, you can cancel the request now.
              </div>
            }
            </div>
            {this.state.distance === '' || this.state.duration === '' || this.state.seatsNeeded === '' ?
              <div>
              <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">Go Back</button>
            </div> 
              </div>
            :
              <div>
              <div className="modal-footer">
              <div className="btn btn-danger" data-dismiss="modal">Cancel</div>
              <div className="btn btn-primary" data-dismiss="modal" onClick={this.matchWithDriverSolo}>Get New Ride</div>
              <div className="btn btn-primary" data-dismiss="modal" onClick={this.matchWithDriverCarpool}>Join Existing Ride</div>
            </div>
              </div>
            }
            
          </div>
        </div>
      </div>

      { /*If matched with driver and not going to destination yet */
        this.state.matchedWithDriver === true && this.state.goingToDestination === false ? 
    <div>
        <TrackingStatic
        currentLocationLatLng={this.state.localDrivers[this.state.matchedDriverID]}
        targetLocationPlaceId={this.state.pickupID}
        riderPickupID2={null}
        />
        Your driver is coming to pick you up! <br/>
        Driver's distance from pickup location: {this.state.driverDistanceFromPickup} <br/>
        Estimate pickup time: {this.state.driverDurationFromPickup} <br/>

        <br/>
        Request Details <br/>
        Pickup: {this.state.pickupAddress} <br/>
        Dropoff: {this.state.destinationAddress} <br/> <br/>
        Distance: {this.state.distance} mile(s) <br/>
        Duration: {this.state.duration} minute(s) <br/>
        Cost: ${this.state.cost} <br/>

    </div>
        : /*Else do nothing */
        <div></div>
      }
      
      { this.state.matchedWithDriver === true && this.state.goingToDestination === true ?
        <div>
        <TrackingStatic
        currentLocationLatLng={this.state.localDrivers[this.state.matchedDriverID]}
        targetLocationPlaceId={this.state.destinationID}
        riderPickupID2={null}
        />
        You're going to your destination
        </div>
        : /*Else do nothing */
        <div></div>
      }

      { this.state.matchedWithDriver === false  && this.state.goingToDestination === false ?
     <div>
        <form className="form-inline">
        <div className="form-group mb-2">
          {/*<h4 className="form-signin-heading">Fill your request:</h4>*/}
          <label className="sr-only">Pickup</label>
          <input className="form-control  mb-2 mr-sm-2 mb-sm-0" id="start" type="text" placeholder="Pickup location" />

          <label className="sr-only">Destination</label>
          <input className="form-control mb-2 mr-sm-2 mb-sm-0" id="end" type="text" placeholder="Destination" />

          <label className="sr-only">Seats Needed</label>
          <input className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Seats needed" value={this.state.seatsNeeded} onChange={this.handleChangeSeatsNeeded} required/>

          <div className="btn btn-primary mb-2 mr-sm-2 mb-sm-0"  onClick={this.estimateRide} >Get Ride Estimate</div>
        </div>
        </form>
        <Tracking
          ref={(trackingComponent) => {this.trackingComponent = trackingComponent;}}
          localDrivers={this.state.localDrivers}
        />
      </div>
        : 
        <div></div>
      }

<div className="modal fade" id="customModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{this.state.customTitle}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {this.state.customMessage}
      </div>
      <div className="modal-footer">
        <div className="btn btn-primary" data-dismiss="modal">Okay</div>
      </div>
    </div>
  </div>
</div>
  {/*Payment error modal*/}
<div className="modal fade" id="paymentModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">No Payment Method added!</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Please add a payment method to request a ride.
      </div>
      <div className="modal-footer">
        <div className="btn btn-primary" data-dismiss="modal">Okay</div>
      </div>
    </div>
  </div>
</div>


<div className="modal fade" id="findingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Finding a driver</h5>
      </div>
      <div className="modal-body">
        Please wait a few seconds while we find a suitable driver for your request.
      </div>
    </div>
  </div>
</div>

</div>
    );
  }
}

var riderModeComponent = null;

export default RiderMode;
