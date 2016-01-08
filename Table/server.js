var osc = require('node-osc'),
    io = require('socket.io-client');

// Socket to common server
var socket = io.connect("http://192.168.1.18:8081");

/***************
 * TUIO Events *
 ***************/

var oscServer = new osc.Server(3333, '192.168.1.8');
oscServer.on("message", function (msg) {
  console.log("TUIO message:");
  console.log(msg);
  socket.emit('table', msg);
  handleTUIO(msg);
});

var handleTUIO = function(msg) {

};

/************************
 * Server communication *
 ************************/

socket.emit('addTable');

socket.on('idevMessage', function (device) {
  document.getElementById("devices").innerHTML += JSON.stringify(device);
});

