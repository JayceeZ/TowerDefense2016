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
      socket.to('table').emit("pseudo", {"pseudo" : player.name});
    }
  });

  socket.on('connectionStatus', function(message){
    playerSocket = getPlayerSocket(message.id);
    playerSocket.emit("connectionStatus",message);
  });

  socket.on('disconnect', function() {
    console.log("PERTE DE CONNEXION");
  });

  /**
   * Updates from core
   */

  /*
    marker --> idplayer, x, y, angle, playerId
   */
  socket.on('updateMarker', function(marker){
    socket.to("table").emit("updateMarker",marker);
  });


  socket.on('removedMarker', function(markerId){
    socket.to("table").emit("removedMarker",markerId);
  });


});

var getPlayerSocket = function(id){
  for(i = 0; i < players.length; i++){
    console.log("test playerid : "+players[i].id+" , id = "+id);
    if(players[i].id == id)
      return players[i].socket;
  }
  return null;
}