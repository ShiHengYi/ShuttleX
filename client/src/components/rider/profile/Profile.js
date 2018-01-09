import React, { Component } from 'react';
import axios from 'axios';


const BASE_API_URL = 'http://localhost:8000/api/v1';



class Profile extends Component{

	constructor(props){
		super(props);
		this.state = {
      uId: this.props.user.uId,
			username : this.props.user.name,
			email : this.props.user.email,
			password : this.props.user.password,
			confirmPassword: this.props.user.confirmPassword,
      error: false,
      serverError: false,
      success: false
		};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    this.setState({error: false, serverError: false});
  }

  handleSubmit(event) {
    console.log("submitting form...");
    const uID = this.state.uId;
    const name = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    if(password != confirmPassword){
      this.setState({error: true});
    }
    
    var str = password;

      var hashedPass = 5381,
      i  = str.length;

      while(i) {
      hashedPass = (hashedPass * 33) ^ str.charCodeAt(--i);
    }

    hashedPass >>> 0;
    console.log(this.state);

    const data = {"account":{"uId": uID, "name": name, "email": email, "password": hashedPass}};
    const api_url = BASE_API_URL + '/account/updateProfile';

    
    axios.post(api_url, data)
    .then((response) => {
      console.log(JSON.stringify(response));
      if(response.status == 200){
        this.setState({success: true});
      }else{
        alert(response.data.message);
      }
    }).catch((error)  => {
      console.log(error.response.data.message);
      this.setState({serverError: true});
    });
    event.preventDefault();
     
 
  }

render(){
  if(this.state.success){
    return(<div className="alert alert-success" role="alert">
  <h4 className="alert-heading">Well done!</h4>
  <p>Your profile has been successfully updated.</p>
  <hr />
  <p className="mb-0">Bye Bye now!</p>
  </div>);
  }
  return (  
	<div className="card mb-3">
        <div className="card-header">
          <i className="fa fa-area-chart"></i> Profile
        </div>
        <div className="card-body">
          <div className="container">
     <h1>Edit Profile</h1>
  	<hr />
   {this.state.serverError? 
          <div className="alert alert-danger" role="alert">
            Data could not be saved!
          </div> : null}

	<div className="row">     
      <div className="col-md-12 personal-info">     
        <h3>Personal info</h3>
        <form className="form-horizontal" role="form">
          <div className="form-group">
            <label className="col-lg-3 control-label">Name:</label>
            <div className="col-lg-8"> 
              <input className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
            </div>
          </div>
          
          
          <div className="form-group">
            <label className="col-lg-3 control-label">Email:</label>
            <div className="col-lg-8">
              <input className="form-control" type="text" name="email" value={this.state.email}  onChange={this.handleChange}/>
            </div>
          </div>
          
          
          <div className="form-group">
            <label className="col-md-3 control-label">Password:</label>
            <div className="col-md-8">
              <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label">Confirm password:</label>
            <div className="col-md-8">
              <input className="form-control" type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
            </div>
          </div>
          {this.state.error? 
          <div className="alert alert-danger" role="alert">
            Passwords do not match!
          </div> : null}
          <div className="form-group">
            <label className="col-md-3 control-label"></label>
            <div className="col-md-8">
              <input type="button" className="btn btn-primary mr-2" value="Save Changes" onClick={this.handleSubmit} />
              <span></span>
              <input type="reset" className="btn btn-default" value="Cancel" />
            </div>
          </div>
        </form>
      </div>
  </div>
</div>
<hr />
        </div>
    
     </div> 
		);
	}

}

export default Profile;