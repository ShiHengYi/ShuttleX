const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const db = require('./models');

const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(webpackConfig);

const port = process.env.PORT || 8000;

const isDeveloping = process.env.NODE_ENV !== 'production'; //development or production mode


const apiRoutes = require('./routes'); //importing api routes from routes.js


let app = express();

//socketio setup
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.sockets.on('connection', (socket) => {
  //console.log('User connected!');
  socket.on('driverCoords', (message) => {
    socket.broadcast.emit('driverCoords', message);
  });
  socket.on('removeDriverCoords', (driverID) => {
    socket.broadcast.emit('removeDriverCoords', driverID);
  });
  socket.on('rideRequest', (driverID) => {
    socket.broadcast.emit('rideRequest' + driverID, '');
  });
  socket.on('pickedUpRider', (riderID) => {
    socket.broadcast.emit('pickedUpRider' + riderID, '');
  });
  socket.on('droppedOffRider', (riderID) => {
    socket.broadcast.emit('droppedOffRider' + riderID, '');
  });
  socket.on('secondRideRequest', (driverID) => {
    socket.broadcast.emit('secondRideRequest' + driverID, '');
  });
});



db.sequelize.sync(
  {force: true}
  ).then(function() {
});

app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development'){
    console.log('Morgan activated....');
    //HTTP Logger
    app.use(morgan('dev'));
}

app.use(webpackMiddleware(compiler,{
 hot: true,
 publicPath: webpackConfig.output.publicPath,
 stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
}));

app.use(webpackHotMiddleware(compiler));

app.use('/api/v1', apiRoutes); // Serving api routes

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
}); //serving react app


server.listen(port, function () {
  console.log(`Server running at localhost: ${port}`)
});


module.exports = app;