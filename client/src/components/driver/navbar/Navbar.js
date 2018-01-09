import React, { Component } from 'react';
import axios from 'axios';

import './Navbar.css';
import Dashboard from 'react-icons/lib/fa/dashboard';
import Signout from 'react-icons/lib/fa/sign-out';
import Search from 'react-icons/lib/fa/search';
import UserCircle from 'react-icons/lib/fa/user';
import Shuttle from 'react-icons/lib/fa/space-shuttle';
import cover from '../assets/cardBg.jpg';
import MapIcon from 'react-icons/lib/fa/map-marker';
import AngleLeft from 'react-icons/lib/fa/angle-left';
import AngleDown from 'react-icons/lib/fa/angle-down';
import IdCard from 'react-icons/lib/fa/user';
import Anchor from 'react-icons/lib/fa/anchor';
import Wrench from 'react-icons/lib/fa/wrench';
import profilePic from '../assets/profilePic.svg';


var socket = io();

class Navbar extends Component{
	constructor(props) {
    super(props);
    this.state = {
    	 name: this.props.name,
      inDriverMode: true,
      dId: this.props.dId
    	};

    this.switchComponent = this.switchComponent.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

//switch between dashboard components
switchComponent(value) {
  this.props.switchStates(value); //update state in parent component
  event.preventDefault();
  $('.collapse').collapse("hide"); //hides navbar in collapse mode 

}

componentDidMount(){
  console.log("Navbar states...");
  console.log(this.state);
}

handleLogout() {
  axios.post('/api/v1/account/logout', {
    dId: this.state.dId
  })
  .then(res =>{});
  socket.emit('removeDriverCoords', this.state.dId);
  location.href ='/';
}

render() {
 
	return (
	<div className="fixed-nav sticky-footer bg-dark" id="page-top">
			{/* Navigation*/}
  	<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <a className="navbar-brand">ShuttleX</a>
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
			
		<li>
			<div className="cardprofile hovercard">
            <div className="cardheader">
               </div>
                <div className="avatar">
                    <img alt="placeholder profile pic" src={profilePic} />
                </div>
                <div className="info">
                  <div className="title">
                        <a target="_blank">{(this.state.name.length > 20)?this.state.name.substring(0,15) + "...":this.state.name}</a>
                  </div>
            </div>
      </div>
    </li>

        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard" >
          <div className="nav-link" onClick={() => this.switchComponent("widget")} >
            <Dashboard className="mr-1"></Dashboard>
            <span className="nav-link-text" value="widget" >Dashboard</span>
          </div>
        </li>
       	
       	   
        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Drive" >
          <div className="nav-link" onClick={() => this.switchComponent("drive")} >
            <Shuttle className="mr-1"></Shuttle>
            <span className="nav-link-text" value="drive" >Drive</span>
          </div>
        </li>

        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Profile" >
          <div className="nav-link " onClick={() => this.switchComponent("profile")}>
             <Wrench className="mr-1"/>
             <span className="nav-link-text" value="profile" >Edit Profile</span>
          </div>
        </li>
        
		 {/*<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Directions">
              <div className="nav-link" onClick={() => this.switchComponent("directions")}>
                 <MapIcon className="mr-1"></MapIcon>
                 <span className="nav-link-text" value="directions" >Directions</span>
               </div>
             </li>*/}


        
      </ul>
      <ul className="navbar-nav sidenav-toggler">
        <li className="nav-item">
          <a className="nav-link text-center" id="sidenavToggler">
            <Anchor></Anchor>
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        
        {/*<li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <IdCard></IdCard><AngleDown/>
                  </a>
            
                  <div className="dropdown-menu" aria-labelledby="alertsDropdown">
                    <h6 className="dropdown-header">Profile</h6>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <span className="text-success">
                        <strong>Settings</strong>
                      </span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <span className="text-success">
                        <strong>Logout</strong>
                      </span>
                    </a>
                    </div>
                    
                </li>*/}
       
        <li className="nav-item">
          <a className="nav-link" data-toggle="modal" data-target="#logoutModal" onClick={this.handleLogout}>
           <Signout></Signout> Logout</a>
        </li>
      </ul>
    </div>
  </nav>

		</div>
	);
}


}

export default Navbar;