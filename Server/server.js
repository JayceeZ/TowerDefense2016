var express = require('express');
var app = express();
var socketio = require('socket.io');

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

var players;
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
    socket.to('players').emit(message);
    socket.to('caca').emit(message);
  });

  socket.on('addTable', function() {
    tableSocket = socket;
  });

  socket.on('addHandDevice', function() {
    socket.join('players');
  });

  socket.on('addCaca', function() {
    socket.join('caca');
  });

  socket.on('addIdev', function() {
    idevSocket = socket;
  });

  socket.on('addPlayer', function(playerName) {
    var player = {socket: socket, id: players.length, name: playerName};

    players.push(player);

    socket.emit('idevLog', "Player " + player.id + " on " + players.length);
  });

  socket.on('disconnect', function() {
    console.log("PERTE DE CONNEXION");
  });
});