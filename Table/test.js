/**
 * Created by alex on 22/01/16.
 */
var io = require('socket.io-client');

var socket = io.connect("http://localhost:8081");

var id = 0;

//socket.emit("addPlayer",{"pseudo":"test"});

socket.on("connectionStatus", function(message){
    id = message.id;
});

setTimeout(function(){socket.emit("putTower",1)},5000);

