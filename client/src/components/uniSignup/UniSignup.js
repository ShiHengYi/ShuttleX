import React, {Component} from 'react';
import './UniSignup.css';
var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink;

class UniSignup extends Component{


	render() {
		return (
			<div>
			<section className="UniLogin_bg">
			
			<div className="container" id="UniLogin-container">

			<div className="row">
			  <div className="col-sm-6">
			    <div className="card bg-transparent border-secondary mb-3">
			      <div className="card-body">
			        <h4 className="card-title" id="unilogin_title">Driver</h4>
			        <p className="card-text" id="unilogin_title">Find everything you need to track your success on the road.</p>
			        <Link className="btn btn-info" id="unilogin_title"  to='/registerDriver'>
            		Driver Sign up
            		</Link>
			      </div>
			    </div>
			  </div>
			  <div className="col-sm-6">
			    <div className="card bg-transparent border-secondary mb-3">
			      <div className="card-body">
			        <h4 className="card-title" id="unilogin_title">Rider</h4>
			        <p className="card-text" id="unilogin_title">Manage your payment options, review trip history, and more.</p>
			        <Link className="btn btn-info" id="unilogin_title"  to='/registerRider'>
            		Rider Sign up
            		</Link>
			      </div>
			    </div>
			  </div>
			</div>

    		</div>

			</section>
		</div>
		);
	}





}

export default UniSignup;