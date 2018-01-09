import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import PropsRoute from 'react-router-dom';

import App from './components/app/App';
import Home from './components/home/Home';
import UniLogin from './components/uniLogin/UniLogin';
import UniSignup from './components/uniSignup/UniSignup';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Rider from './components/rider/Rider';
import Driver from './components/driver/Driver';
import Notfound from './components/notfound/Notfound';
import RiderMode from './components/ridermode/RiderMode';
import DriverMode from './components/drivermode/DriverMode';


export default(
	<App>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/UniLogin" component={UniLogin} /> 
				<Route path="/UniSignup" component={UniSignup} />

				<Route path='/loginRider' render={routeProps => <Login {...routeProps} isDriver={false} title="Rider Sign In"/>} />
				<Route path='/loginDriver' render={routeProps => <Login {...routeProps} isDriver={true} title="Driver Sign In"/>} />
				<Route path="/registerRider" render={routeProps => <Signup {...routeProps} isDriver={false} title="Rider Sign up"/>}/>
				<Route path="/registerDriver" render={routeProps => <Signup {...routeProps} isDriver={true} title="Driver Sign up"/>}/>
				
				<Route path="/driver" component={Driver} />
				<Route path="/rider" component={Rider} />
				<Route path="/ridermode" component={RiderMode}/>
				<Route path="/drivermode" component={DriverMode}/>
				<Route path="/*" component={Notfound}/>
			</Switch>
    </App>
	)