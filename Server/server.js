var express = require('express');
var socketio = require('socket.io');

var app = express();
app.use(express.static(__dirname + '/'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.get('/', function(req, res, next) {
  res.render('index.html');
});

var port = 8080;

var players = [];
var tableSocket;
var idevSocket;

init();

console.log("Server started");

function init() {
  console.log("Initialisation");

  players = [];
  tableSocket = null;
}

// launch the http server on given port
app.listen(port);

/**
 * Sockets API
 */
var ioServer = socketio(8081);
var PLAYER_ID = 0;

/**
 * Add
 */

ioServer.on('connection', function(socket) {
  socket.on('log', function(content) {
    console.log(content + " received from " + socket.id);
    idevSocket.join('idev');
    idevSocket.emit('idevLog', content);
  });

  socket.on('addTable', function() {
    console.log('Table authentified');
    socket.join('table');
  });

  socket.on('addCore', function() {
    console.log('Core authentified');
    socket.join('core');
  });

  socket.on('addStats', function() {
    console.log('Stats authentified');
    socket.join('stats');
  });

  socket.on('addIdev', function() {
    idevSocket = socket;
  });

  socket.on('addPlayer', function(message) {
    already = false;
    for(i = 0; i < players.length; i ++)
      if(players[i].pseudo == message.pseudo)
        already = true;
    if(!already) {
      var player = {socket: socket, id: players.length, name: message.pseudo};
      players.push(player);
      socket.to('core').emit("addPlayer", {"pseudo": player.name, "id": player.id});
    }
  });

  socket.on('connectionStatus', function(message){
    playerSocket = getPlayerSocket(message.id);
    playerSocket.emit("connectionStatus",message);
    if(message.status == true)
      socket.to('table').emit("pseudo", {"pseudo" : player.name});
  });

  socket.on('disconnect', function() {
    console.log("PERTE DE CONNEXION");
  });

  /**
   * Updates from core
   */

  /*
    marker --> idmarker, x, y, angle, playerId, placementok
   */
  socket.on('updateMarker', function(marker){
    console.log("Update marker");
    socket.to("table").emit("updateMarker", marker);
  });

  socket.on('removeMarker', function(markerId){
    console.log("Remove marker");
    socket.to("table").emit("removeMarker", markerId);
  });

  socket.on('checkPlacement', function(message){
    playerSocket = getPlayerSocket(message.idplayer);
    if(playerSocket != null)
      playerSocket.emit("checkPlacement",message.check);
  });

  socket.on('launchVague', function(vague){
    socket.to("table").emit("launchVague",vague);
    for(i = 0; i < players.length;i++)
      players[i].socket.emit("launchVague",vague);
  });

  /*
    enemy : id, startPoint, pathPoints, pathDirections
   */
  socket.on('initEnemy', function(enemy){
    socket.to("table").emit("initEnemy",enemy);
  });

  /*
    message --> idplayer, x , y, angle
   */
  socket.on('validateTower', function(message){
    socket.to("table").emit("validateTower",message);
  });


    /**
     * Updates from players
     */

  socket.on('putTower', function(){
    socket.to("core").emit("putTower",getPlayerFromSocket(socket));
  });

  socket.on('isReady', function(value){
    socket.to("core").emit("isReady",{"idplayer":getPlayerFromSocket(socket),"value":value});
  });


  /**
   * Updates from table
   */

  socket.on('launchGame', function(message){
    socket.to("core").emit("launchGame",message);
  });


});

var getPlayerSocket = function(id){
  for(i = 0; i < players.length; i++){
    if(players[i].id == id)
      return players[i].socket;
  }
  return null;
}

var getPlayerFromSocket = function(socket){
  for(i = 0; i < players.length; i++){
    if(players[i].socket == socket)
      return players[i].id;
  }
  return null;
}