import React, { Component } from 'react';

import './Driver.css';
import Navbar from './navbar/Navbar';
import Dashboard from './dashboard/Dashboard';
import Profile from './profile/Profile';
import Directions from './directions/Directions';

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
        uId: this.props.location.state.uID,
        name: this.props.location.state.name,
        email: this.props.location.state.email,
        password: this.props.location.state.password,
        isDriver: this.props.isDriver,
        componentToRender: 'widget'
      };

      this.switchDashboardComponent = this.switchDashboardComponent.bind(this);

    }

  componentDidMount() {
   console.log("In driver.js");
   console.log(this.state);
  }

  switchDashboardComponent(component){
    this.setState({componentToRender: component}); 
  }


  render() {
    var list = ["widget", "profile", "drive", "directions"];
    return (
      <div>
      <Navbar name={this.state.name} dId={this.state.uId} switchStates={this.switchDashboardComponent}></Navbar>
      {this.state.componentToRender === "widget" ? <Dashboard currentComponent={"widget"} uID={this.state.uId} name={this.state.name} email={this.state.email} password={this.state.password}/> : null}
      {this.state.componentToRender === "profile" ? <Dashboard currentComponent={"profile"} uID={this.state.uId} name={this.state.name} email={this.state.email} password={this.state.password}/> : null}
      {this.state.componentToRender === "drive" ? <Dashboard currentComponent={"drive"} uID={this.state.uId} name={this.state.name} email={this.state.email} password={this.state.password}/> : null}
      {this.state.componentToRender === "directions" ? <Dashboard currentComponent={"directions"} uID={this.state.uId} name={this.state.name} email={this.state.email} password={this.state.password}/> : null}
      </div>
    );
  }
}

export default Driver;
