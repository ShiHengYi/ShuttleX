import React, { Component } from 'react';


import './Rider.css';
import Navbar from './navbar/Navbar';
import Dashboard from './dashboard/Dashboard';
import Profile from './profile/Profile';
import Directions from './directions/Directions';

class Rider extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	uId: this.props.location.state.uID,
      name: this.props.location.state.name,
      payment:this.props.location.state.payment,
      email: this.props.location.state.email,
      password: this.props.location.state.password,
      isDriver: this.props.isDriver,
      componentToRender: 'dashboard'
      };

      this.switchDashboardComponent = this.switchDashboardComponent.bind(this);
      this.updatePaymentStatusforRider = this.updatePaymentStatusforRider.bind(this);
    }

  componentDidMount() {
  	console.log("in rider");
    console.log(this.state);
  }

  switchDashboardComponent(component){
    this.setState({componentToRender: component}); 
  }

  updatePaymentStatusforRider(){
    this.setState({payment: true});
  }

  render() {
    var list = ["dashboard", "profile", "payment", "directions"];
    return (
      <div>
      <Navbar name={this.state.name} switchStates={this.switchDashboardComponent}></Navbar>
      {this.state.componentToRender === "dashboard" ? <Dashboard currentComponent={"dashboard"} uID={this.state.uId} name={this.state.name} email={this.state.email} password={this.state.password} payment={this.state.payment}/> : null}
      {this.state.componentToRender === "profile" ? <Dashboard currentComponent={"profile"}     uID={this.state.uId} name={this.state.name} email={this.state.email} password={this.state.password} payment={this.state.payment}/> : null}
      {this.state.componentToRender === "payment" ? <Dashboard currentComponent={"payment"}     uID={this.state.uId} name={this.state.name} email={this.state.email} password={this.state.password} payment={this.state.payment} updatePaymentStatus={this.updatePaymentStatusforRider}/> : null}
      {this.state.componentToRender === "directions" ? <Dashboard currentComponent={"directions"} uID={this.state.uId} name={this.state.name} email={this.state.email} password={this.state.password} payment={this.state.payment}/> : null}
  
      </div>
    );
  }
}

export default Rider;
