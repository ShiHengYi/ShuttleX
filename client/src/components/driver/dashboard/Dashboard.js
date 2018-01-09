import React, { Component } from 'react';

import './Dashboard.css';
import Profile from '../profile/Profile';
import Directions from '../directions/Directions';
import DriverMode from '../../drivermode/DriverMode';
var Forecast = require('react-forecast');

class Footer extends React.Component {
   render() {
     return (
     <div>
     <footer className="sticky-footer dashFooter">
      <div className="container">
        <div className="text-center">
          <small>Copyright © ShuttleX 2017</small>
        </div>
      </div>
    </footer>
    </div>
     );
   }
}


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      uID: this.props.uID,
      name: this.props.name,
      email:this.props.email,
      password: this.props.password,
      confirmPassword: this.props.password,
      currentComponent: this.props.currentComponent,
      exitedDriverMode: false
    };
    this.disableDriverMode = this.disableDriverMode.bind(this);
  }


  componentDidMount(){
    console.log(this.state);
  }

  componentWillUnmount(){
    console.log(this.state);
  }


  disableDriverMode(){
    console.log("Exiting driver mode. ..", exit);
    this.setState({exitedDriverMode:true});
    event.preventDefault();
  }

  render() {
    var USER_DATA = {
    uId: this.state.uID,
    name: this.state.name,
    email: this.state.email,
    password: this.state.password,
    confirmPassword: this.state.confirmPassword
  };


    return (
    <div>
	   <div className="content-wrapper mt-5">
	    <div className="container-fluid ">
	      <ol className="breadcrumb bg-info">
	        <li className="breadcrumb-item">
	          <a href="#">Dashboard/{this.state.currentComponent}</a>
	        </li>
	      </ol>
	      <div className="row">
	        <div className="col-12">
            {this.state.currentComponent === "widget" ? <Forecast latitude={37.3382} longitude={-121.8863} name='San Jose' /> : null}
	          {this.state.currentComponent === "profile" ? <Profile user={USER_DATA} /> : null}
            {this.state.currentComponent === "drive" ? <DriverMode uID={this.state.uID} exitDriverMode={this.disableDriverMode}/> : null}
	        </div>
	      </div>
	    </div>
	  	{ /*<Footer></Footer>*/}
	  	</div>
      </div>
    );
  }
}

export default Dashboard;