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

var markersTUIO = [];

var handleTUIO = function(msg) {
  for(i = 0; i < markersTUIO.length; i++)
    markersTUIO[i].status = "unknown";
  for(i = 0; i < msg.length; i++){
    if(msg[i].length >= 7 && msg[i][0] == "/tuio/2Dobj"){
      tag = msg[i][3];
      x = msg[i][4];
      y = msg[i][5];
      angle = msg[i][6];
      tuioObjectDetected({"id":tag,"x":x,"y":y,"angle":angle,"playerId":null});
    }
  }
  for(i = 0; i < markersTUIO.length; i++){
    if(!game.creating && markersTUIO[i].marker.playerId === null)
      continue;
    if(markersTUIO[i].status == "unknown"){
      socket.emit("removedMarker", markersTUIO[i].marker);
      markersTUIO.splice(1,i);
      i--;
    }else if(markersTUIO[i].status == "update"){
      socket.emit("updateMarker", markersTUIO[i].marker);
    }
  }
};



var tuioObjectDetected = function(marker){
  console.log("TUIO Object : tag = "+marker.id+" , x = "+marker.x+" , y = "+marker.y+" , angle = "+marker.angle);
  index = -1;
  for(i = 0; i < markersTUIO.length; i++)
    if(markersTUIO[i].marker.id == marker.id)
      index = i;
  if(index == -1){
    markersTUIO.push({"marker": marker, "status": "update"});
    for(i = 0; i < game.players.length; i++)
      if(game.players[i].marker.id == marker.id)
        marker.playerId = game.players[i].id;
  }else{
    if(markersTUIO[index].marker.x != marker.x || markersTUIO[index].marker.y != marker.y || markersTUIO[index].marker.angle != marker.angle){
      marker.playerId = markersTUIO[index].marker.playerId;
      markersTUIO[index].marker = marker;
      markersTUIO[index].status = "update";
    }else
      markersTUIO[index].status = "noChange";
  }

}

var nonAssociatedTUIO = function(marker){
  socket.emit("marker",marker);
}

var associatedTUIO = function(player,marker){
  player.updateMarker(marker);
  if(player.markerStatus == "updated");
}



/************************
 * Server communication *
 ************************/

socket.emit('addCore');

socket.on('toTable', function(message) {
  console.log(message);
  switch(message.protocol){
    case "playerConnect":
          playerConnect(message);
  }
});

socket.on('addPlayer', function (message) {
  status = {"id" : message.id, "status" : true, "message" : "Ok"}
  if(game.creating && game.players.length < game.maxPlayers){
    player = new User(message.id,message.pseudo);
    game.addPlayer(player);
    console.log("Player connected : id = "+player.id+" , pseudo = "+player.pseudo);
  }else{
    status.status = false;
    if(!game.creating)
      status.message = "Cette partie n'est pas en cours de création";
    else if(game.players.length >= game.maxPlayers)
      status.message = "Le nombre de joueurs max est atteint";
  }
  socket.emit("connectionStatus",status);
});

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


/**
 Core
 **/

