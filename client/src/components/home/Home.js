import React, { Component } from 'react';
import './Home.css';

import banner1  from './assets/banner1.jpg';
import banner2  from './assets/banner2.jpg';
import banner3  from './assets/banner3.jpg';

import feature1  from './assets/feature1.png';
import feature2  from './assets/feature2.png';
import feature3  from './assets/feature3.png';

import sfo  from './assets/sfo.jpg';
import airport  from './assets/airport.jpg';
import driver  from './assets/driver.jpg';

var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink;

class Home extends Component{


  constructor(props){
    super(props);

    this.displayModal = this.displayModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  displayModal(id){
    if(id == "1"){
  $('#infoModal').modal('show');
}else if(id == "2"){
  $('#infoModal2').modal('show');
}else if(id == "3"){
  $('#infoModal3').modal('show');
}

  }

  hideModal(){
    $('#infoModal').modal('hide');
  }


	render(){
		return(
			<div>
				
			<header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="#">ShuttleX</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link"  to='/loginRider'>
             Ride
             <span className="sr-only">(current)</span>
             </Link>

            </li>
            <li className="nav-item">
              <Link className="nav-link"  to='/loginDriver'>
              Drive
             </Link>
            </li>
           
          </ul>
          <form className="form-inline mt-2 mt-md-0">

            {/*Navbar router links*/}
            <Link className="btn btn-success mr-sm-2"  to='/registerDriver'>
            Become a driver
            </Link>

            <Link className="btn btn-outline-primary my-2 my-sm-0"  to='/UniSignup'>
            Sign up
            </Link>

            <Link className="btn btn-outline-primary my-2 my-sm-0 ml-1"  to='/UniLogin'>
            Log in
            </Link>

          </form>
        </div>
      </nav>
    </header>

    <main role="main">

      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="first-slide" src={banner1} alt="First slide" />
            <div className="container">
              <div className="carousel-caption text-left">
              <p>  Get thereYour day belongs to you</p>
                <p>Get to your destination faster than ever imagined!</p>
                
                <Link className="btn btn-lg btn-primary"  to='/UniSignup'> Sign up today </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img className="second-slide" src={banner2} alt="Second slide" />
            <div className="container">
              <div className="carousel-caption">
                <h1>Make money on the Go!</h1>
                <p>Earn easy cash on your convenience!</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img className="third-slide" src={banner3} alt="Third slide" />
            <div className="container">
              <div className="carousel-caption text-right">
                <h1>One more for good measure.</h1>
                <p>Luxury service at affordable prices</p>
              </div>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>


     

      <div className="container marketing">

        <div className="row">
          <div className="col-lg-4">
            <img className="rounded-circle" src={feature1} alt="Feature 1" width="140" height="140" />
            <h2>Easiest way around</h2>
            <p>One tap and a car comes directly to you. Hop in—your driver knows exactly where to go. And when you get there, just step out. Payment is completely seamless.</p>
            <p><a className="btn btn-secondary" href="#" role="button" value={"1"} onClick={() => this.displayModal("1")}>View details &raquo;</a></p>

          <div className="modal fade" id="infoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Easiest way around</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h2>Easiest way around</h2>
            <p>One tap and a car comes directly to you. Hop in—your driver knows exactly where to go. And when you get there, just step out. Payment is completely seamless.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          </div>
          <div className="col-lg-4">
            <img className="rounded-circle" src={feature2} alt="Feature 2" width="140" height="140" />
            <h2>Anywhere, anytime</h2>
            <p>Daily commute. Errand across town. Early morning flight. Late night drinks. Wherever you’re headed, count on Uber for a ride—no reservations required.</p>
            <p><a className="btn btn-secondary" href="#" role="button" value={"2"} onClick={() => this.displayModal("2")}>View details &raquo;</a></p>
            <div className="modal fade" id="infoModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Anywhere, anytime</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h2>Anywhere, anytime</h2>
              <p>Daily commute. Errand across town. Early morning flight. Late night drinks. Wherever you’re headed, count on Uber for a ride—no reservations required.</p>                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="col-lg-4">
            <img className="rounded-circle" src={feature3} alt="Feature 3" width="140" height="140" />
            <h2>Low-cost to luxury</h2>
            <p>Economy cars at everyday prices are always available. For special occasions, no occasion at all, or when you just need a bit more room, call a black car or SUV.</p>
            <p><a className="btn btn-secondary" href="#" role="button" value={"3"} onClick={() => this.displayModal("3")}>View details &raquo;</a></p>
            <div className="modal fade" id="infoModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Low-cost to luxury</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h2>Low-cost to luxury</h2>
            <p>Economy cars at everyday prices are always available. For special occasions, no occasion at all, or when you just need a bit more room, call a black car or SUV.</p>
              </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          </div>
          

        </div>



        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading">Adding new destinations everyday. <span className="text-muted">SFO and more...</span></h2>
            <p className="lead">Added 3 new destinations in the past 5 months</p>
          </div>
          <div className="col-md-5">
            <img className="featurette-image img-fluid mx-auto" src={sfo} alt="SFO" width="500" height="500" />
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading">Oh yeah, it's that good. <span className="text-muted">See for yourself.</span></h2>
            <p className="lead">Less waiting and getting more done.</p>
          </div>
          <div className="col-md-5 order-md-1">
            <img className="featurette-image img-fluid mx-auto" src={airport} alt="airport" width="500" height="500" />
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading">And lastly, this one. <span className="text-muted">Earn Money at your convenience.</span></h2>
            <p className="lead">Start earning with just one click anytime, anywhere.</p>
          </div>
          <div className="col-md-5">
            <img className="featurette-image img-fluid mx-auto" src={driver} alt="Driver" width="500" height="500" />
          </div>
        </div>

        <hr className="featurette-divider" />


      </div>


  
      <footer className="container">
        <p className="float-right"><a href="#">Back to top</a></p>
        <p>&copy; 2017 ShuttleX, Inc.</p>
      </footer>

    	</main>


			</div>

			);
	}
}

export default Home;