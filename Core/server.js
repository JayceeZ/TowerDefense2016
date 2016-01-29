var osc = require('node-osc'),
    io = require('socket.io-client'),
    Game = require('./Game.js'),
    User = require('./User.js'),
    Map = require('./Map.js'),
    Marker = require('./Marker.js'),
    TUIOHandler = require('./TUIOHandler.js');

// Socket to common server
var socket = io.connect("http://192.168.1.21:8081");

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
  for(a = 0; a < removes.length; a++)
    socket.emit("removeMarker", {"id":removes[a],"playerId":game.getPlayerIdFromMarker(removes[a])});

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
  var i;
  for(i = 0; i < message.length; i++)
    game.setPlayerTag(message[i].idplayer,message[i].idtag,message[i].color);
  handler.clear();
  socket.emit('gameReady');
  game.launch();
});

socket.on('selectTower', function(message){
  game.setSelectedTower(message.idplayer,message.type);
  socket.emit('playerSelectTower',{"idplayer":message.idplayer,"type":message.type,"preview":game.getPreviewTower(message.idplayer)});
});


socket.on('putTower', function(idplayer){
  var marker = handler.getMarkerFromIdPlayer(idplayer);
  if(marker != null && marker.positionOk == true){
    var tower = game.addTower(idplayer,marker.x,marker.y,marker.angle);
    if(tower !== null)
      socket.emit("validateTower",{"idplayer":idplayer,"id":tower.id,"x":tower.x,"y":tower.y,"angle":tower.angle,"type":tower.type});
  }
});

socket.on('isReady', function(message){
  game.setPlayerReady(message.idplayer,message.value);
});

socket.on('removePlayer', function(id){
  if(game.creating === true)
    game.removePlayer(id);
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

