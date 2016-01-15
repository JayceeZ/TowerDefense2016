var osc = require('node-osc'),
    io = require('socket.io-client'),
    Game = require('./Game.js'),
    User = require('./User.js');

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

var tuioObjectDetected = function(tag,x,y,angle){
  console.log("TUIO Object : tag = "+tag+" , x = "+x+" , y = "+y+" , angle = "+angle);
}

/************************
 * Server communication *
 ************************/

socket.emit('addTable');

socket.on('toTable', function(message) {
  console.log(message);
  switch(message.protocol){
    case "playerConnect":
          playerConnect(message);
  }
});

socket.on('playerConnect', function (message) {
  console.log(message);
  playerConnect(message);
});


var playerConnect = function(message){
  status = {"playerid" : message.id, "status" : true, "message" : "Ok"}
  if(game.creating && game.players.length < game.maxPlayers){
    player = new User(message.id,message.pseudo);
    game.addPlayer(player);
    console.log("Player connected : id = "+player.id+" , pseudo = "+player.pseudo);
  }else{
    status.status = false;
    if(!game.creating)
      status.message = "Cette partie n'est pas en cours de création";
    else if(ame.players.length >= game.maxPlayers)
      status.message = "Le nombre de joueurs max est atteint";
  }
  socket.emit("toPlayer",status);
}


socket.on('launchGame', function (message) {
  if(game.creating) {
    if(game.readyToLaunch()) {
      Console.log("Launching Game with "+game.players.length+" player(s)");
      game.launch();
    }
  }
});

/*
  Launch core
 */

var game = new Game(4);
game.launch();
