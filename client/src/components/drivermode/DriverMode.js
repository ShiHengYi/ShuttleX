import React, { Component } from 'react';
import axios from 'axios';
import TrackingBasic from '../tracking/TrackingBasic';
import TrackingStatic from '../tracking/TrackingStatic';
import ReactLoading from 'react-loading';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

var socket = io();

class DriverMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
       uID: 'driverblank',
       currentLocation: {
       		lat: 37.3352,
       		lng: -121.8811
       },
       matchedRiderID1: '',
       matchedRiderID2: '',
       riderPickupID1: '',
       riderPickupID2: '',
       riderDestinationID: '',
       matchedWithRider: false,
       matchedWithSecondRider: false,
       pickedUpRider1Flag: false,
       pickedUpRider2Flag: false,
       stopWatchingGeolocation: false,
       inDriverMode: true,
       address:  'San Jose, CA', //default location
       customLocation: false
      };

    this.handleClick = this.handleClick.bind(this);
    this.getAndSetGeolocation = this.getAndSetGeolocation.bind(this);
    this.broadcastGeolocation = this.broadcastGeolocation.bind(this);
    this.removeBroadcastGeolocation = this.removeBroadcastGeolocation.bind(this);
    this.findRideRequest = this.findRideRequest.bind(this);
    this.pickedUpRider1 = this.pickedUpRider1.bind(this);
    this.pickedUpRider2 = this.pickedUpRider2.bind(this);
    this.endRide = this.endRide.bind(this);
    this.findSecondRideRequest = this.findSecondRideRequest.bind(this);

    this.getAndSetGeolocationTESTER = this.getAndSetGeolocationTESTER.bind(this);
    this.disableandExitDriverMode = this.disableandExitDriverMode.bind(this);
  
    this.onChange = (address) => {
      this.setState({ address });
      //console.log(address);
    }
    //this.handleLocationFormChange =  this.handleLocationFormChange.bind.this;
    this.handleLocationFormSubmit = this.handleLocationFormSubmit.bind(this);



  }

  disableandExitDriverMode() {
    this.props.exitDriverMode();
    event.preventDefault();
  }

  componentWillMount() {
  	this.setState({
  		uID: this.props.uID
  	});
  }

  componentDidMount() {
  	//this.getAndSetGeolocationTESTER();
    //setInterval(this.getAndSetGeolocationTESTER, 5000);
    this.getAndSetGeolocation();
  	setInterval(this.getAndSetGeolocation, 5000);
    // this.getAndSetGeolocationTESTER();
    // this.broadcastGeolocation();
    // setInterval(this.broadcastGeolocation, 5000);


  	socket.on('rideRequest' + this.state.uID, () => {
      console.log('Got request!');
  		this.findRideRequest();
  	});
    socket.on('secondRideRequest' + this.state.uID, () => {
      console.log('Got second request!');
      this.findSecondRideRequest();
    });
  }

  handleClick() {
  	var myObject = 'mewmewmew';
  	socket.emit('driverCoords', myObject);
  }

  getAndSetGeolocationTESTER() {
    if (this.state.uID === 6) {
      this.setState({
          currentLocation: {
              lat: 37.3352,
              lng: -121.8811
        }
      });
    } else if (this.state.uID === 8) {
      this.setState({
          currentLocation: {
              lat: 37.6213,
              lng: -122.3790
        }
      });
    }else if (this.state.uID === 9) {
      this.setState({
          currentLocation: {
              lat: 37.778313,
              lng: -122.231827
        }
      });
    }else if (this.state.uID === 10) {
      this.setState({
          currentLocation: {
              lat: 37.70338,
              lng:  -122.135696
        }
      });
    }else if (this.state.uID === 11) {
      this.setState({
          currentLocation: {
              lat:  37.548933,
              lng:  -122.34993
        }
      });
    }else if (this.state.uID === 12) {
      this.setState({
          currentLocation: {
              lat: 37.427979,
              lng:  -122.168655

        }
      });
    }else if (this.state.uID === 13) {
      this.setState({
          currentLocation:{
              lat: 37.528243,
              lng: -121.917343
        }
      });
    }
    
     else if (true){
      this.setState({
          currentLocation: {
              lat: 37.4323,
              lng: -121.8996
        }
      });
    }
    this.broadcastGeolocation();
  }

  getAndSetGeolocation() {
   
  	if (navigator && navigator.geolocation) {
  		if (this.state.stopWatchingGeolocation === false) {
  			navigator.geolocation.getCurrentPosition((pos) => {
            const coords = pos.coords;
            this.setState({
                currentLocation: {
                    lat: coords.latitude,
                    lng: coords.longitude
            	}
            });
            this.broadcastGeolocation();
        	})
  		}
      }
    }

  broadcastGeolocation() {
    if (this.state.stopWatchingGeolocation === false) {
      var driverCoordsObj = {
      dID: this.state.uID,
      lat: this.state.currentLocation.lat,
      lng: this.state.currentLocation.lng
      };
      socket.emit('driverCoords', driverCoordsObj);
    }
  }

  removeBroadcastGeolocation() {
   // disableandExitDriverMode();
   $("#exitModal").modal('show');
  	this.setState({
  		stopWatchingGeolocation: true,
      inDriverMode: false
  	});
    
  	socket.emit('removeDriverCoords', this.state.uID);
    axios.post('/api/v1/account/logout', {
      dId: this.state.uID
    })
    .then(res =>{});
  }

  findRideRequest() {
    axios.get('/api/v1/riderequest/' + this.state.uID)
    .then(res => {
      this.setState({
        matchedRiderID1: res.data.riderequest.rid1,
        matchedRiderID2: res.data.riderequest.rid2,
        riderPickupID1: res.data.riderequest.pickup1,
        riderPickupID2: res.data.riderequest.pickup2,
        riderDestinationID: res.data.riderequest.dropoff,
        matchedWithRider: true
      });
      $('#goingToPickup').modal('show');
    });
  }

  findSecondRideRequest() {
    axios.get('/api/v1/riderequest/' + this.state.uID)
    .then(res => {
      this.setState({
        matchedRiderID1: res.data.riderequest.rid1,
        matchedRiderID2: res.data.riderequest.rid2,
        riderPickupID1: res.data.riderequest.pickup1,
        riderPickupID2: res.data.riderequest.pickup2,
        riderDestinationID: res.data.riderequest.dropoff,
        matchedWithRider: true,
        matchedWithSecondRider: true
      });
      $('#gotSecondRider').modal('show');
    });
  }

  pickedUpRider1() {
    socket.emit('pickedUpRider', this.state.matchedRiderID1);
    this.setState({
      pickedUpRider1Flag: true
    });
  }

  pickedUpRider2() {
    socket.emit('pickedUpRider', this.state.matchedRiderID2);
    this.setState({
      pickedUpRider2Flag: true,
      matchedWithSecondRider: false
    });
  }

  endRide() {
    socket.emit('droppedOffRider', this.state.matchedRiderID1);
    socket.emit('droppedOffRider', this.state.matchedRiderID2);
    this.setState({
      matchedRiderID1: '',
      matchedRiderID2: '',
      riderPickupID1: '',
      riderPickupID2: '',
      riderDestinationID: '',
      matchedWithRider: false,
      matchedWithSecondRider: false,
      pickedUpRider1Flag: false,
      pickedUpRider2Flag: false,
      stopWatchingGeolocation: false
    });
  }
  


  handleLocationFormSubmit(){
    console.log("submitting form");
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {

        this.setState({
          currentLocation: {
              lat:latLng.lat,
              lng: latLng.lng
          }
        });
         this.broadcastGeolocation();
      }
        )
      .catch(error => console.error('Error', error));

      event.preventDefault();
  }



  

  render() {

    //props to pass into autocomplete address search bar
  const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }


    return (
      <div>
     { /*<form className="setLocation">
           <PlacesAutocomplete inputProps={inputProps}  name="address" /> 
         <input type="button" className="btn btn-primary  ml-2" value="Set Current Location" onClick={this.handleLocationFormSubmit} />
           </form>*/}
    <div>

<div className="btn btn-danger float-right" onClick={this.removeBroadcastGeolocation}>Exit Driver Mode</div>
    
{/*Exit driver modal popup notification*/}
<div className="modal fade" id="exitModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Exiting Driving Mode</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>You will no longer revceive ride requests!</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Okay</button>
      </div>
    </div>
  </div>
</div>
{/************/}


</div>
<h2 className="form-signin-heading">Driver Mode</h2>
<div className="modal fade" id="goingToPickup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">You got a request!</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Your map has rendered the route from your current location to their pickup location.

        <br/><br/>
        Drive safe!
      </div>
      <div className="modal-footer">
        <div className="btn btn-primary" data-dismiss="modal">Let's go</div>
      </div>
    </div>
  </div>
</div>
<div className="modal fade" id="gotSecondRider" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">You got a request!</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
            A second rider requested to carpool to the same destination.
            As you go to your destination, you will pick up the second rider along the way. <br/> <br/>
            The second rider's location is indicated at a waypoint.

        <br/><br/>
        Drive safe!
      </div>
      <div className="modal-footer">
        <div className="btn btn-primary" data-dismiss="modal">Let's go</div>
      </div>
    </div>
  </div>
</div>

        {this.state.matchedWithRider === false && this.state.pickedUpRider1Flag === false && this.state.pickedUpRider2Flag === false?
          <div>

         
        <TrackingBasic/>
        Waiting for rider request.. 
        <ReactLoading type={"bars"} color={"#00000"}/>
        <br/>
          </div>
        :<div></div>
        }
        {this.state.matchedWithRider === true && this.state.pickedUpRider1Flag === false?
          <div>

          <TrackingStatic
          currentLocationLatLng={this.state.currentLocation}
          targetLocationPlaceId={this.state.riderPickupID1}
          riderPickupID2={null}
          />
        <div className="btn btn-success" onClick={this.pickedUpRider1}>Picked up rider</div>
          </div>
        :<div></div>
        }

        {this.state.matchedWithRider === true && this.state.pickedUpRider1Flag === true && this.state.pickedUpRider2Flag === false?
          <div>

          <TrackingStatic
          currentLocationLatLng={this.state.currentLocation}
          targetLocationPlaceId={this.state.riderDestinationID}
          riderPickupID2={this.state.riderPickupID2}
          />
          </div>
        :<div></div>
        }
        {this.state.matchedWithRider === true && this.state.pickedUpRider1Flag === true && this.state.pickedUpRider2Flag === true?
          <div>
          <TrackingStatic
          currentLocationLatLng={this.state.currentLocation}
          targetLocationPlaceId={this.state.riderDestinationID}
          riderPickupID2={null}
          />
          </div>
        :<div></div>
        }
        {
          this.state.matchedWithSecondRider && this.state.pickedUpRider1Flag && !this.state.pickedUpRider2Flag?
          <div className="btn btn-success" onClick={this.pickedUpRider2}>Picked up second rider</div>
          : null
        }

        {
          this.state.matchedWithRider && this.state.pickedUpRider1Flag && !this.state.pickedUpRider2Flag && !this.state.matchedRiderID2?
          <div className="btn btn-danger" onClick={this.endRide}>End ride</div>
          : null
        }

        {
          this.state.matchedWithRider && this.state.pickedUpRider1Flag && this.state.pickedUpRider2Flag && this.state.matchedRiderID2 !== null?
          <div className="btn btn-danger" onClick={this.endRide}>End ride</div>
          : null
        }

        {/*
          My ID: {this.state.uID} <br/>
        RiderID1: {this.state.matchedRiderID1} <br/>
        RiderID2: {this.state.matchedRiderID2} <br/>
        RiderPickupID1: {this.state.riderPickupID1} <br/>
        RiderPickupID2: {this.state.riderPickupID2} <br/>
        RiderDestinationID: {this.state.riderDestinationID} <br/>
        */}
      </div>
    );
  }
}

export default DriverMode;
