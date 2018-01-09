import React, { Component } from 'react';
import './Login.css';
import Driver from '../driver/Driver';
import Rider from '../rider/Rider';
import RiderMode from '../ridermode/RiderMode';
import DriverMode from '../drivermode/DriverMode';

import PropTypes from 'prop-types';
import axios from 'axios';




const BASE_API_URL = 'http://localhost:8000/api/v1';

class Login extends Component{
   constructor(props) {
    super(props);
    this.state = {
       email: '',
       pass: '',
       isAuthenticated: false,
       isDriver: this.props.isDriver,
       title: this.props.title,
       error: false
      };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  
  //test props
  componentDidMount(){
     console.log(this.props.isDriver);
     console.log(this.state.email);
     this.setState({
      email: '',
      pass: ''
    });
  }
  

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      email: this.email.value,
      pass: this.pass.value,
      error: false
    });
    console.log(this.pass.value);
  }


  handleSubmit(event) {
    //console.log(this.email.value + " : " + this.pass.value);
  
  var str = this.pass.value;

  var hashedPass = 5381,
      i  = str.length;

    while(i) {
      hashedPass = (hashedPass * 33) ^ str.charCodeAt(--i);
    }

    hashedPass >>> 0;


    console.log(hashedPass);


    const data = {"account":{"email":this.email.value, "password": hashedPass, "isDriver":this.state.isDriver}};
    const api_url = BASE_API_URL + '/account/login';

    axios.post(api_url, data)
    .then((response) => {
      console.log(JSON.stringify(response));
      if(response.status == 200){
      var uID = response.data.uID;

       if(this.state.isDriver){
        axios.post('/api/v1/account/driver/online',
        {
          dId: response.data.uID
        })
        .then(res =>{});
        this.context.router.history.push({pathname: '/driver', state: { uID: response.data.uID, name: response.data.name, email: response.data.email, password: response.data.password, seatCount: response.data.seatCount, payment:response.data.payment}});
        }else{
        this.context.router.history.push({pathname: '/rider', state: { uID: response.data.uID, name: response.data.name, email: response.data.email, password: response.data.password, payment: response.data.payment}});
      }
      }else{
        alert(response.data.message);
      }
    }).catch((error)  => {
      console.log(error.response.data.message);
      //alert(error.response.data.message);
      this.setState({error: true});
    });

    event.preventDefault();

  }



render(){

   
	return(
<div>
 <section className="hero">
	<div className="container" id="login-container">
  {this.state.error?
  <div className="alert alert-danger" role="alert">
      <strong>Oh snap!</strong> Invalid email or password
  </div> : null
  }
      <form className="form-signin" >
        <h2 className="form-signin-heading">{this.props.title}</h2>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" ref={(email) => this.email = email} onChange={this.handleChange} required/>
        <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" ref={(pass) => this.pass = pass} onChange={this.handleChange} required />
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleSubmit}>Sign in</button>

      </form>
    </div>
  </section>
</div>  
    );
}



}


Login.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Login;