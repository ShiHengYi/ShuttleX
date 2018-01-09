import React, { Component } from 'react';

import axios from 'axios';
import './Payment.css';
const BASE_API_URL = 'http://localhost:8000/api/v1';



class Footer extends React.Component {
   render() {
     return (
     <div>
     <footer className="sticky-footer">
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


class Payment extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      uId: this.props.uId,
      number: this.props.cardNumber,
      name: this.props.name,
      expiry:this.props.expiry,
      cvc: this.props.cvc,
      error: false,
      serverError : false,
      success:false,
      invalidCardNumber: false,
      invalidCVC: false,
      invalidData: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePaymentStatusDashboard = this.updatePaymentStatusDashboard.bind(this);
  }

  handleChange(event) {
    console.log(this.state);
    this.setState({[event.target.name]: event.target.value});
    
    if(this.state.number.length < 16 || this.state.number.length > 16){
      this.setState({invalidCardNumber: true});
    }else if(this.state.number.length == 16){
      this.setState({invalidCardNumber: false});
    }


   // this.setState({error: false, serverError: false});
  }

  updatePaymentStatusDashboard(){
    console.log("updating payment status from payment....");
    this.props.updatePayment();
    event.preventDefault();
  }

  handleSubmit(event) {
     event.preventDefault();
     
    console.log("submitting form...");
    const uId = this.state.uId;
    const cardNumber = this.state.number;
    const expiry = this.state.expiry;
    const cvc = this.state.cvc;
    
    
    
    const data = {"uId": uId, "cNumber": cardNumber, "expr": expiry, "cvc" : cvc};
    const api_url = BASE_API_URL + '/account/updatePayment';

    //  updatePaymentStatusDashboard(); //propogating  payment status to parent components
    this.props.updatePayment();

    axios.post(api_url, data)
    .then((response) => {
      console.log(JSON.stringify(response));
      if(response.status == 200){

        this.setState({success: true});

        alert(response.data.message);
      }else{
        alert(response.data.message);
      }
    }).catch((error)  => {
      console.log(error.response.data.message);
      this.setState({serverError: true});
    });
   
 
  }

  render() {

    return (
      <div className="card mb-3">
        <div className="card-header">
          Add/Update Payment Method
        </div>
        	<div className="card-body">
          	<div className="container">
  					<hr />
				<div className="row"> 
        

         <div className="panel panel-default credit-card-box">
                <div className="panel-heading display-table" >
                    <div className="row display-tr" >
                        <h3 className="panel-title display-td" >Payment Details</h3>
                        <div className="display-td" >                            
                            <img className="img-responsive pull-right" src="http://i76.imgup.net/accepted_c22e0.png" />
                        </div>
                    </div>                    
                </div>
                  {this.state.invalidCardNumber === true ?
                  <div className="alert alert-danger" role="alert">
                  Invalid Credit Card Number!
                  </div>
                  :
                  null}

                <div className="panel-body">
                    <form role="form" id="payment-form">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="cardNumber">CARD NUMBER</label>
                                    <div className="input-group">
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="number"
                                            placeholder="Valid Card Number"
                                            value={this.state.number} onChange={this.handleChange}
                                        />
                                        <span className="input-group-addon"><i className="fa fa-credit-card"></i></span>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="cardExpiry"><span className="hidden-xs">EXPIRATION</span><span className="visible-xs-inline">EXP</span> DATE</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="expiry"
                                        placeholder="MM / YY"
                                        value={this.state.expiry} onChange={this.handleChange}
                                         
                                    />
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="cardCVC">CVC CODE</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="cvc"
                                        placeholder="CVC"
                                        value={this.state.cvc} onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                       
                        <div className="row">
                            <div className="col-md-12">
                                <button className="subscribe btn btn-success btn-lg btn-block" onClick={this.handleSubmit}>Add Payment</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>




  			</div>
		</div>
		<hr />
        </div>
    
     </div> 
    );
  }
}

export default Payment;