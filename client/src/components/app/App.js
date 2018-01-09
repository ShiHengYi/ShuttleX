import React, { Component } from 'react';

import './App.css';
import Driver from '../driver/Driver';
import Home from '../home/Home';
import Signup from '../signup/Signup';
import Login from '../login/Login';

// var ReactRouter = require('react-router-dom');
// var Router = require('react-router-dom').BrowserRouter;
// var Route = require('react-router-dom').Route;
// import { Switch } from 'react-router';


class App extends Component {
  render() {
    return (
		<div>
          {this.props.children}
        </div>

      
    );
  }
}

export default App;
