var express = require('express');
var app = express();
var httpserver = require('http').createServer(app);
var io = require('socket.io').listen(httpserver);

io.enable('browser client minification');  // send minified client
io.enable('browser client etag');          // apply etag caching logic based on version number

io.set('transports', [
    'websocket',
    'flashsocket',
    'htmlfile',
    'xhr-polling',
    'jsonp-polling'
]);

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res, next) {
    res.render('index.html');
});

var port = 8080;

// launch the http server on given port
httpserver.listen(port);

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

io.sockets.on('connection', function (socket) {
    socket.on('log', function(content) {
        if(idevSocket)
            idevSocket.emit('idevLog', content);
    });

    socket.on('addTable', function () {
        tableSocket = socket;
    });

    socket.on('addIdev', function (playerName) {
        idevSocket = socket;
    });

    socket.on('addPlayer', function (playerName) {
        var player = {socket: socket, id: players.length, name: playerName};

        players.push(player);

        socket.emit('idevLog', "Player " + player.id + " on " + players.length);
    });

    socket.on('disconnect', function () {
        console.log("PERTE DE CONNEXION");
    });
});