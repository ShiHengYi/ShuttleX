import React, { Component } from 'react';

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
import ToggleBtn from 'react-icons/lib/fa/bars';
import CreditCardIcon from 'react-icons/lib/fa/credit-card';
import Car from 'react-icons/lib/fa/bus';
import History from 'react-icons/lib/fa/history';




class Navbar extends Component{
	constructor(props) {
    super(props);
    this.state = {
    	 name: this.props.name
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

handleLogout() {
  location.href ='/';
}

render() {
	return (
	<div className="fixed-nav sticky-footer bg-dark" id="page-top">
			{/* Navigation*/}
  	<nav className="navbar navbar-expand-lg navbar-inverse bg-info fixed-top" id="mainNav">
    <a className="navbar-brand">ShuttleX</a>
    <button className="navbar-toggler navbar-toggler-right " type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <ToggleBtn></ToggleBtn>
    </button>
    <div className="collapse navbar-collapse " id="navbarResponsive">
      <ul className="navbar-nav navbar-sidenav navbar-inverse bg-info" id="exampleAccordion">
			
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
          <div className="nav-link" onClick={() => this.switchComponent("dashboard")}>
          <Car className="mr-1"></Car>
            <span className="nav-link-text" value="dashboard" >Request Ride</span>
          </div>
        </li>
       	
       	<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Profile" >
          <div className="nav-link" onClick={() => this.switchComponent("profile")}>
             <Wrench className="mr-1"/>
             <span className="nav-link-text" value="profile" >Edit Profile</span>
            
          </div>
        </li>
        
        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Payment" >
          <div className="nav-link" onClick={() => this.switchComponent("payment")}>
          <CreditCardIcon className="mr-2"></CreditCardIcon>
            <span className="nav-link-text" value="payment" >Payment</span>
          </div>
        </li>
        
		    { /*<li className="nav-item" data-toggle="tooltip" data-placement="right" title="Directions" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
             <div className="nav-link" onClick={() => this.switchComponent("directions")}>
             <History className="mr-1"></History>
                <span className="nav-link-text" value="directions" >Ride History</span>
              </div>
            </li>*/}


        
      </ul>
      <ul className="navbar-nav sidenav-toggler bg-info">
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