import React, { Component } from 'react';
import './Signup.css';
import PropTypes from 'prop-types';
import axios from 'axios';


const BASE_API_URL = 'http://localhost:8000/api/v1';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      pass: '',
      confirmPass: '',
      seatCount: '',
      isDriver: this.props.isDriver,
      title: this.props.title,
      isAuthenticated: false,
      error: false,
      errorMsg: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  //test props
  componentDidMount() {
    console.log(this.props.isDriver);
  }


  handleChange(event) {
    this.setState({
      name: this.name.value,
      email: this.email.value,
      pass: this.pass.value,
      confirmPass: this.confirmPass.value,
      error: false,
      isAuthenticated: false
    });
  }

  handleSubmit(event) {

    const name = this.name.value;
    const email = this.email.value;
    const pass = this.pass.value;
    const confirmPass = this.confirmPass.value;
    //const seatCount = this.seatCount.value;

    const driver = this.props.isDriver;
    //some checks for invalid data
    if (pass != confirmPass) {
      alert("Passwords dont match!");
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false){
      alert("Invalid email!");
      return;
    }
    if (name == '' || email == '' || pass == '' || confirmPass == '') {
      alert("Empty fields!");
      return;
    }

    // //console.log(name, email, pass, confirmPass);
    //hash function
    var str = pass;
    var hashedPass = 5381,
      i = str.length;
    while (i) {
      hashedPass = (hashedPass * 33) ^ str.charCodeAt(--i);
    }
    hashedPass >>> 0;

    var data = null;
    if (!this.state.isDriver) {
      data = { "account": { "name": name, "email": email, "password": hashedPass, "password_confirmation": hashedPass, isDriver: driver } };
      console.log(data);
    } else if (this.state.isDriver) {
      data = { "account": { "name": name, "email": email, "password": hashedPass, "password_confirmation": hashedPass, isDriver: driver, seatCount: this.seatCount.value } };
      console.log(data);
    }
    const api_url = BASE_API_URL + '/account/register';

    axios.post(api_url, data)
      .then((response) => {
        console.log(JSON.stringify(response));
        if (response.status == 200) {

          if (this.state.isDriver) {
            axios.post('/api/v1/driver/create', {
              driver: {
                did: response.data.uId,
                name: response.data.name,
                isOnline: true,
                partyCount: 0,
                totalSeats: response.data.seatCount,
                openSeats: response.data.seatCount
              }
            })
              .then((driverRes) => {

              }).catch((error) => {
                console.log(error);
              });
            this.context.router.history.push({ pathname: '/driver', state: { uID: response.data.uId, name: response.data.name, email: response.data.email, password: response.data.password, seatCount: response.data.seatCount, payment: response.data.payment } });
          } else {
            this.context.router.history.push({ pathname: '/rider', state: { uID: response.data.uId, name: response.data.name, email: response.data.email, password: response.data.password, payment: response.data.payment } });
          }
        } else if (response.status == 400) {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error.response.data.message);
        this.setState({ error: true, errorMsg: error.response.data.message, isAuthenticated: false });
      });
    event.preventDefault();
  }

  render() {
    return (

      <div>
        <section className="hero">

          <div className="container" id="signup-container">

            {this.state.isAuthenticated ?
              <div className="alert alert-success" role="alert">
                <strong>{this.name.value}</strong> You have been successfully registered!
    </div> : null
            }

            <form className="form-signin ">
              <h2 className="form-signin-heading">{this.props.title}</h2>

              <label htmlFor="name" className="sr-only">Name</label>
              <input type="text" id="name" className="form-control" placeholder="Name" ref={(name) => this.name = name} onChange={this.handleChange} required />


              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input type="email" id="inputEmail" className="form-control" placeholder="Email address" ref={(email) => this.email = email} onChange={this.handleChange} required />
              {this.state.error ? <div className="form-control-feedback">Sorry, that email's taken. Try another</div> : null}

              {this.state.isDriver ?
                <div>
                  <label htmlFor="seatCount" className="sr-only">Seat Count</label>
                  <input type="text" id="seatCount" className="form-control" placeholder="Shuttle Seat Count" ref={(seatCount) => this.seatCount = seatCount} onChange={this.handleChange} required />
                </div>
                : null}

              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" id="inputPassword" className="form-control" placeholder="Password" ref={(pass) => this.pass = pass} onChange={this.handleChange} required />

              <label htmlFor="confirmInputPassword" className="sr-only">Password</label>
              <input type="password" id="confirmInputPassword" className="form-control" placeholder="Confirm Password" ref={(confirmPass) => this.confirmPass = confirmPass} onChange={this.handleChange} required />


              <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleSubmit}>Sign up</button>
            </form>

          </div>

        </section>


      </div>


    );
  }



}

Signup.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Signup;