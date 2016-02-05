var express = require('express');
var socketio = require('socket.io');

var app = express();
app.use(express.static(__dirname));

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

var coreIp = null;
var coreStatus = null;

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
    if(coreIp === null) {
      console.log('Core authentified');
      coreIp = socket.handshake.address.address;
      socket.join('core');
    }else
      console.log('Core already authentified');
  });

  socket.on('addStats', function() {
    console.log('Stats authentified');
    socket.join('stats');
  });

  socket.on('addIdev', function() {
    idevSocket = socket;
  });

  socket.on('addPlayer', function(message) {
    console.log('Add Player');
    already = false;
    for(i = 0; i < players.length; i ++)
      if(players[i].pseudo == message.pseudo)
        already = true;
    if(!already) {
      var player = {socket: socket, id: PLAYER_ID, name: message.pseudo};
      PLAYER_ID++;
      players.push(player);
      socket.to('core').emit("addPlayer", {"pseudo": player.name, "id": player.id});
    }
  });

  socket.on('connectionStatus', function(status){
    console.log('Connection status : '+status.status);
    playerSocket = getPlayerSocket(status.id);
    playerSocket.emit("connectionStatus",{"status":status.status,"message":status.message});
    if(status.status == true) {
      socket.to('table').emit("addPlayer", {"id": status.id, "pseudo": status.pseudo});
      socket.to('stats').emit("connection",{"id":status.id, "pseudo":status.pseudo});
    }
  });

  socket.on('disconnect', function() {
    console.log("PERTE DE CONNEXION");
    /*
    var player = getPlayerFromSocket(socket);
    if(player != null) {
      console.log("Player disconnect : "+player);
      socket.to('table').emit("removePlayer",player);
      socket.to('core').emit("removePlayer",player);
    }*/
  });

  socket.on('discover', function(){
    console.log("Discovering");
    if(coreIp !== null){
      socket.emit('coreDetected',{"ip":coreIp,"status":coreStatus});
    }
  });

  /**
   * Updates from core
   */

  socket.on('coreStatus', function(status){
    coreStatus = status;
  });

  /*
    marker --> idmarker, x, y, angle, playerId, placementok
   */
  socket.on('updateMarker', function(marker){
    //console.log("Update marker");
    socket.to("table").emit("updateMarker", marker);
    socket.to("stats").emit("updateMarker", marker);
  });


  /*
    message : id, playerId
   */
  socket.on('removeMarker', function(message){
    //console.log("Remove marker : "+message.playerId+"  , "+message.id);
    socket.to("table").emit("removeMarker", message);
  });

  socket.on('gameReady', function(){
    console.log('Game ready');
    socket.to("table").emit("gameReady");
    for(i = 0; i < players.length;i++)
      players[i].socket.emit("gameReady");
  });

  socket.on('checkPlacement', function(message){
    //console.log('Check placement : '+message.check);
    playerSocket = getPlayerSocket(message.idplayer);
    if(playerSocket != null)
      playerSocket.emit("checkPlacement",message.check);
  });

  socket.on('launchPlacement', function(){
    console.log('Launch placement');
    socket.to("table").emit("launchPlacement");
    for(i = 0; i < players.length;i++)
      players[i].socket.emit("launchPlacement");
  });

  socket.on('endPlacement', function(){
    console.log('End Placement');
  });

  socket.on('launchVague', function(vague){
    console.log('Launch vague : ' + vague);
    socket.to("table").emit("launchVague", vague);
    for(i = 0; i < players.length;i++)
      players[i].socket.emit("launchVague", vague);
    socket.to("stats").emit("launchVague", vague);
  });

  /*
    message : id , t
   */
  socket.on('enemyEscape', function(message){
    console.log('Enemy escape');
    socket.to('table').emit("killEnemy",{"id":message.id,"t":message.t});
  });

  socket.on('endVague', function(time){
    console.log('End vague');
    socket.to('stats').emit("endVague");
    socket.to('table').emit("endVague", time);
    for(i = 0; i < players.length;i++)
      players[i].socket.emit("endVague");
  });

  /*
    enemy : id, vitesse, start, pathPoints, pathDirections
   */
  socket.on('initEnemy', function(enemy){
    console.log('Init enemy : ' + enemy.vitesse);
    socket.to("table").emit("initEnemy", enemy);
  });

  /*
    message : idplayer, type, preview
   */
  socket.on('playerSelectTower', function(message){
    socket.to("table").emit("playerSelectTower",message);
  });

  /*
    message --> idplayer, id, x , y, angle, type
   */
  socket.on('validateTower', function(message){
    console.log('Validate tower');
    socket.to("table").emit("validateTower",message);
  });

  /*
    message --> t1 , launcher, t2, target
   */
  socket.on('projectile', function(message){
    console.log('Projectile : t1 = '+message.t1+" , x = "+message.launcher.x+" , y = "+message.launcher.y+"t2 = "+message.t2+" , x = "+message.target.x+" , y = "+message.target.y);
    socket.to('table').emit("projectile",{"start":message.t1,"from":message.launcher,"end":message.t2,"to":message.target});
  });

  /*
    message --> id, t, idplayer
   */
  socket.on('killEnemy', function(message){
    console.log("kill enemy : id = "+message.id+" , t = "+message.t);
    socket.to('table').emit("killEnemy",{"id":message.id,"t":message.t});
    socket.to('stats').emit("killEnemy",message.idplayer);
  });

  socket.on('endGame', function(){
    console.log('End Game');
    socket.to('table').emit("endGame");
    socket.to('stats').emit("endGame");
    for(i = 0; i < players.length;i++)
      players[i].socket.emit("endGame");
  });

  /*
    message : infosPlayers[] , infoGame
   */
  socket.on('globalUpdate', function(message){
    //console.log("GlobalUpdate");
    //console.log("Info game : id = "+message.infoGame.id+" , vague : "+message.infoGame.vague+" totalEscaped : "+message.infoGame.totalEscapes);
    socket.to("stats").emit("globalUpdate",message);
    var i;
    for(i = 0; i < message.infoPlayers.length; i++){
      //console.log("Info Player :  id = "+message.infoPlayers[i].id+" ,pseudo = "+message.infoPlayers[i].pseudo+" , kills = "+message.infoPlayers[i].kills+" ,score = "+message.infoPlayers[i].score);
      var playerSocket = getPlayerSocket(message.infoPlayers[i].id);
      if(playerSocket !== null)
        playerSocket.emit("globalUpdate",{"infoGame":message.infoGame,"infoPlayer":message.infoPlayers[i]});
    }
  });


    /**
     * Updates from players
     */

  socket.on('putTower', function(){
    console.log("Put tower");
    socket.to("core").emit("putTower",getPlayerFromSocket(socket));
  });

  socket.on('isReady', function(value){
    console.log("isReady");
    socket.to("core").emit("isReady",{"idplayer":getPlayerFromSocket(socket),"value":value});
  });

  socket.on('selectTower', function(type){
    console.log("selectTower");
    socket.to("core").emit("selectTower",{"idplayer":getPlayerFromSocket(socket),"type":type});
  });

  socket.on('selectTowerTest', function(type){
    socket.to("core").emit("selectTower",{"idplayer":0,"type":type});
  });

  socket.on('putTowerTest', function(){
    console.log("Put tower");
    socket.to("core").emit("putTower",0);
  });

  socket.on('isReadyTest', function(value){
    console.log("isReady");
    socket.to("core").emit("isReady",{"idplayer":0,"value":value});
  });




  /**
   * Updates from table
   */

  socket.on('launchGame', function(message){
    console.log("launchGame : "+message.length);
    socket.to("core").emit("launchGame",message);
    socket.to("stats").emit("launchGame");
  });

  /**
   * -> pseudo, color
   */
  socket.on('playerColorUpdate', function(message) {
    console.log("player "+ message.pseudo +" color update "+message.color);
    socket.to("stats").emit("playerColorUpdate", message);
    playerSocket = getPlayerSocket(message.id);
    playerSocket.emit("playerColorUpdate",message.color);
  });

  /**
   *  Updates from stats
   */
  socket.on('updateBonusMalus', function(message) {
    console.log("Update bonus/malus : "+message.pseudo+" , "+message.multiplicateur);
    socket.to("core").emit("updateBonusMalus", message);
  });
});


var getPlayerSocket = function(id){
  for(i = 0; i < players.length; i++){
    if(players[i].id == id)
      return players[i].socket;
  }
  return null;
};

var getPlayerFromSocket = function(socket){
  for(i = 0; i < players.length; i++){
    if(players[i].socket == socket)
      return players[i].id;
  }
  return null;
};