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


ioServer.on('connection', function(socket) {
  socket.on('log', function(content) {
    console.log(content + " received from " + socket.id);
    idevSocket.join('idev');
    idevSocket.emit('idevLog', content);
  });

  socket.on('table', function(message) {
    console.log('Table sending message to Players and Core');
    socket.to('players').emit('table', message);
    socket.to('core').emit('table', message);
  });

  socket.on('toTable', function(message) {
    console.log("toTable : "+message);
    socket.to('table').emit("toTable",message);
  });

  socket.on('addTable', function() {
    console.log('Table authentified');
    socket.join('table');
  });

  socket.on('addHandDevice', function() {
    console.log('Hand Device authentified');
    socket.emit('addedHandDevice', {message: 'Device added'});
    socket.join('players');
  });

  socket.on('addCore', function() {
    console.log('Core authentified');
    socket.join('core');
  });

  socket.on('addIdev', function() {
    idevSocket = socket;
  });

  socket.on('addPlayer', function(message) {
    var player = {socket: socket, id: players.length, name: message.pseudo};
    console.log("Player connected : "+message.pseudo);
    players.push(player);
    socket.to('table').emit("toTable", {"protocol" : "playerConnect", "pseudo" : player.name, "id" : player.id});
  });

  socket.on('toPlayer', function(message){
    playerSocket = getPlayerSocket(message.playerid);
    playerSocket.emit("salut",message);
  });

  socket.on('disconnect', function() {
    console.log("PERTE DE CONNEXION");
  });

  socket.on('playerStatus', function(message){

  });

});

var getPlayerSocket = function(id){
  for(i = 0; i < players.length; i++){
    console.log("test playerid : "+players[i].id+" , id = "+id);
    if(players[i].id === id)
      return players[i].socket;
  }
  return null;
}