import React, { Component } from 'react';

import './Dashboard.css';
import Profile from '../profile/Profile';
import Payment from '../payment/Payment';
import Directions from '../directions/Directions';
import RiderMode from '../../ridermode/RiderMode';
var Forecast = require('react-forecast');

import axios from 'axios';
const BASE_API_URL = 'http://localhost:8000/api/v1';

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
      payment: this.props.payment
    };

    this.getPaymentInfo = this.getPaymentInfo.bind(this);
    this.updatePaymentStatus = this.updatePaymentStatus.bind(this);
  }



  componentDidMount(){
    console.log(this.state);
  }

  updatePaymentStatus(){
    this.setState({payment: true});
    this.props.updatePaymentStatus();
    event.preventDefault();
  }


  getPaymentInfo(uId){
    event.preventDefault();


    const data = {"uId": uId};
    const api_url = BASE_API_URL + '/account/getPaymentInfo';

    
    axios.post(api_url, data)
    .then((response) => {
      console.log(JSON.stringify(response));
      if(response.status == 200){
        this.setState({payment: true});
        return response.data;
        alert(response.data);
      }else{
          
        alert(response.data.message);
        return "failed";
      }
    }).catch((error)  => {
      console.log(error.response.data.message);
      this.setState({serverError: true});
      return "error";
    });
  }



  render() {
    var USER_DATA = {
    uId: this.state.uID,
    name: this.state.name,
    email: this.state.email,
    password: this.state.password,
    confirmPassword: this.state.confirmPassword
  };

    if(this.state.currentComponent === "payment" && this.state.payment){
      var PAYMENT_INFO = this.getPaymentInfo(this.state.uID);
      console.log(PAYMENT_INFO);
    }


    return (
    <div>
	   <div className="content-wrapper mt-5">
	    <div className="container-fluid ">
	      <ol className="breadcrumb bg-danger">
	        <li className="breadcrumb-item">
	          <a href="#">Dashboard</a>
	        </li>
	        {/*<li className="breadcrumb-item active">Blank Page</li>*/}
	      </ol>
	      <div className="row">
	        <div className="col-12">
            {this.state.currentComponent === "dashboard" ? <RiderMode uID={this.state.uID} payment={this.state.payment}/> : null}
	          {this.state.currentComponent === "profile" ? <Profile user={USER_DATA} /> : null}
            {this.state.currentComponent === "payment" ? <Payment uId={this.state.uID} updatePayment={this.updatePaymentStatus}  /> : null}
            {this.state.currentComponent === "directions" ? <Directions></Directions> : null}
	        </div>
	      </div>
	    </div>
	  	<Footer></Footer>
	  	</div>
      </div>
    );
  }
}

export default Dashboard;