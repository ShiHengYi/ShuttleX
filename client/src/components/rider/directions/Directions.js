import React, { Component } from 'react';

import './Directions.css';


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


class Directions extends Component {


  render() {

    return (
      <div className="card mb-3">
        <div className="card-header">
          Drive
        </div>
        	<div className="card-body">
          	<div className="container">
  					<hr />
				<div className="row">     
      		<h1>Directions Component!</h1>
  			</div>
		</div>
		<hr />
        </div>
    
     </div> 
    );
  }
}

export default Directions;