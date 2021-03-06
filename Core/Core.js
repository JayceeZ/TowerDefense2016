var osc = require('node-osc'),
    io = require('socket.io-client'),
    Game = require('./Game.js'),
    User = require('./User.js'),
    Map = require('./Map.js'),
    Marker = require('./Marker.js'),
    TUIOHandler = require('./TUIOHandler.js');

// Socket to common server
var socket = io.connect("http://localhost:8081");

/***************
 * TUIO Events *
 ***************/


var oscServer = new osc.Server(3333, '192.168.1.7');
oscServer.on("message", function (msg) {
  handleTUIO(msg);
});


var handleTUIO = function(msg){
  handler.startRefresh();
  var a;
  for(a = 0; a < msg.length; a++){
    if(msg[a].length >= 7 && msg[a][0] == "/tuio/2Dobj"){
      var tag = msg[a][3];
      var x = msg[a][4];
      var y = msg[a][5];
      var angle = msg[a][6];
      var marker = new Marker(tag,x,y,angle);
      handler.handleMarker(marker);
    }
  }
  var updates = handler.getUpdates();
  for(a = 0; a < updates.length; a++){
    socket.emit("updateMarker",updates[a]);
    if(game.status === "placement")
      socket.emit("checkPlacement",{"idplayer":updates[a].playerId,"check":updates[a].positionOk});
  }
  var removes = handler.getRemoves();
  for(a = 0; a < removes.length; a++) {
    var idplayer = game.getPlayerIdFromMarker(removes[a]);
    socket.emit("removeMarker", {"id": removes[a], "playerId":idplayer });
    socket.emit("checkPlacement",{"idplayer":idplayer,"check":false});
  }

};


/************************
 * Server communication *
 ************************/
socket.on('connect', function(){
  socket.emit('addCore');
});

socket.on('debugUpdateMarker', function(marker){
  handler.handleMarker(marker);
  var updatemarker = handler.getMarkerFromId(marker.id);
  socket.emit("updateMarker",updatemarker);
  var playerid = updatemarker.playerId;
  if(playerid !== null)
    socket.emit("checkPlacement",{"idplayer":playerid,"check":updatemarker.positionOk});
});

socket.on('debugRemoveMarker', function(id){
  handler.removeMarker(id);
  var playerid = handler.getMarkerFromId(id).playerId;
  socket.emit("removeMarker", {"id": id, "playerId": playerid});
  if(playerid !== null)
    socket.emit("checkPlacement",{"idplayer":playerid,"check":false});
});


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
  var i;
  for(i = 0; i < message.length; i++)
    game.setPlayerTag(message[i].idplayer,message[i].idtag,message[i].color);
  handler.clear();
  socket.emit('gameReady');
  game.launch();
});

socket.on('selectTower', function(message){
  if(game.setSelectedTower(message.idplayer,message.type) === true) {
    socket.emit('playerSelectTower',{"playerId":message.idplayer,"type":message.type,"preview":game.getPreviewTower(message.idplayer)});
    var marker = handler.getMarkerFromIdPlayer(message.idplayer);
    if(marker !== null) {
      socket.emit("updateMarker",marker);
      socket.emit("checkPlacement",{"idplayer":message.idplayer,"check":game.checkPlacement(marker)});
    }
  }
});


socket.on('putTower', function(idplayer){
  var marker = handler.getMarkerFromIdPlayer(idplayer);
  if(marker != null && marker.positionOk === true){
    var tower = game.addTower(idplayer,marker.x,marker.y,marker.angle);
    if(tower !== null) {
      socket.emit("validateTower",{"playerId":idplayer,"id":tower.id,"x":tower.x,"y":tower.y,"angle":tower.angle,"type":tower.type});
      marker.positionOk = false;
      socket.emit("updateMarker",marker);
      socket.emit("checkPlacement",{"idplayer":idplayer,"check":false});
    }
  }
});

socket.on('isReady', function(message){
  game.setPlayerReady(message.idplayer,message.value);
});

socket.on('removePlayer', function(id){
  if(game.creating === true)
    game.removePlayer(id);
});

socket.on('updateBonusMalus', function(message){
  game.updateBonusMalus(message.pseudo, message.multiplicateur);
});

socket.on('requestViewData', function(){

});




/*
  Launch core
 */


var game = new Game(socket);
var handler = new TUIOHandler(game);
game.init(4);

//TESTS
/*
var player = new User(1,"test");
game.addPlayer(player);
game.addTower(1,0.5,0.5,0);
game.setPlayerTag(1,"B2","red");
game.launch();
game.setPlayerReady(1,true);
*/

