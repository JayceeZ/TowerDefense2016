/**
 * Created by alex on 22/01/16.
 */
var io = require('socket.io-client');

var socket = io.connect("http://localhost:8081");




//socket.emit("addPlayer",{"pseudo":"test"});

//socket.emit("putTower",0);

socket.emit("isReady",{"idplayer":0,"value":true});

