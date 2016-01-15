var osc = require('node-osc'),
    io = require('socket.io-client'),
    Game = require('/Game.js'),
    User = require('/User.js');

// Socket to common server
var socket = io.connect("http://192.168.1.21:8081");

/***************
 * TUIO Events *
 ***************/

var oscServer = new osc.Server(3333, '192.168.1.8');
oscServer.on("message", function (msg) {
  handleTUIO(msg);
});

var handleTUIO = function(msg) {
  for(i = 0; i < msg.length; i++){
    if(msg[i].length >= 7 && msg[i][0] == "/tuio/2Dobj"){
      tag = msg[i][3];
      x = msg[i][4];
      y = msg[i][5];
      angle = msg[i][6];
      tuioObjectDetected(tag,x,y,angle);
    }
  }
};
Core
var tuioObjectDetected = function(tag,x,y,angle){
  console.log("TUIO Object : tag = "+tag+" , x = "+x+" , y = "+y+" , angle = "+angle);
}

/************************
 * Server communication *
 ************************/

socket.emit('addTable');


socket.on('playerConnect', function (message) {
  if(game.creating && game.players.length < game.maxPlayers){
    player = new User(IDPlayers,message[0]);
    game.addPlayer(player);
    Console.log("Player connected : id = "+player.id+" , pseudo = "+player.pseudo);
  }
});

socket.on('launchGame', function (message) {
  if(game.creating && game.readyToLaunch()) {
    game.launch();
  }
});

/*
  Launch core
 */

var IDPlayers = 1;
var game = new Game(4);
