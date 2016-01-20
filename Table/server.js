var osc = require('node-osc'),
    io = require('socket.io-client'),
    Game = require('./Game.js'),
    User = require('./User.js'),
    Map = require('./Map.js');

// Socket to common server
var socket = io.connect("http://192.168.1.21:8081");

/***************
 * TUIO Events *
 ***************/

var oscServer = new osc.Server(3333, '192.168.1.7');
oscServer.on("message", function (msg) {
  handleTUIO(msg);
});

var lockTUIO = false;

var markersTUIO = [];

var handleTUIO = function(msg) {
  console.log("handle TUIO");
  while(lockTUIO == true)
    console.log("waiting TUIO");
  lockTUIO = true;
  var i;
  for(i = 0; i < markersTUIO.length; i++)
    markersTUIO[i].status = "unknown";
  var a;
  for(a = 0; a < msg.length; a++){
    if(msg[a].length >= 7 && msg[a][0] == "/tuio/2Dobj"){
      tag = msg[a][3];
      x = msg[a][4];
      y = msg[a][5];
      angle = msg[a][6];
      tuioObjectDetected({"id":tag,"x":x-1,"y":y,"angle":angle,"playerId":null,"positionOk":false});
    }
  }
  var l = markersTUIO.length;

  for(i = 0; i < l; i++){
    if(!game.creating && markersTUIO[i].marker.playerId === null) {
      markersTUIO.splice(1,i);
      i--;
      l--;
      continue;
    }
    if(markersTUIO[i].status == "unknown"){
      socket.emit("removeMarker", markersTUIO[i].marker.id);
      markersTUIO.splice(1,i);
      i--;
      l--;
      if(game.status == "placement"){
        socket.emit("checkPlacement",{"idplayer":markersTUIO[i].marker.playerId,"check":false});
      }
    }else if(markersTUIO[i].status == "update"){
      markersTUIO[i].marker.positionOk = game.checkPlacement(markersTUIO[i].marker);
      socket.emit("updateMarker", markersTUIO[i].marker);
      if(game.status == "placement"){
        socket.emit("checkPlacement",{"idplayer":markersTUIO[i].marker.playerId,"check":markersTUIO[i].marker.positionOk});
      }
    }

  }
  lockTUIO = false;
};



var tuioObjectDetected = function(marker){
  var index = -1;
  var i = 0;
  merker.playerId = getPlayerIdFromMarker(marker.id);
  for(i = 0; i < markersTUIO.length; i++)
    if(markersTUIO[i].marker.id == marker.id)
      index = i;
  if(index == -1){
    markersTUIO.push({"marker": marker, "status": "update"});
  }else{
    if(markersTUIO[index].marker.x != marker.x || markersTUIO[index].marker.y != marker.y || markersTUIO[index].marker.angle != marker.angle){
      markersTUIO[index].marker = marker;
      markersTUIO[index].status = "update";
    }else
      markersTUIO[index].status = "noChange";
  }

}

var getPlayerIdFromMarker = function(id){
  var i;
  for(i = 0; i < game.players.length; i++)
    if(game.players[i].markerid == id)
      return game.players[i].id;
  return null;
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
  status = {"id" : message.id, "status" : true, "message" : "Ok","pseudo":message.pseudo};
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
  for(i = 0; i < message.length; i++)
    game.setPlayerTag(message[i].idplayer,message[i].idtag);
  socket.emit('gameReady');
  game.launch();
});

socket.on('putTower', function(idplayer){
  marker = null;
  for(i = 0; i < markersTUIO.length; i++)
    if(markersTUIO[i].marker.playerId == idplayer)
      marker = markersTUIO[i].marker;
  if(marker != null && marker.positionOk == true){
    game.addTower(idplayer,marker.x,marker.y,marker.angle);
    socket.emit("validateTower",{"idplayer":idplayer,"x":marker.x,"y":marker.y,"angle":marker.angle});
  }
});

socket.on('isReady', function(message){
  game.setPlayerReady(message.idplayer,message.value);
});




/*
  Launch core
 */

var game = new Game(4,socket);
map = new Map();
map.setHeight(100);
map.setWidth(200);
game.setMap(map);


/**
 Core
 **/

