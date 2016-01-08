/****************
 * OSC Over UDP *
 ****************/

var osc = require('node-osc');

var oscServer = new osc.Server(3333, '192.168.1.8');
oscServer.on("message", function (msg) {
  console.log("TUIO message:");
  console.log(msg);
});