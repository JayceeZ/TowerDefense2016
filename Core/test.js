/**
 * Created by alex on 22/01/16.
 */
var io = require('socket.io-client');


/*
var socket;
var i = 0;

var timer = setInterval(function(){
    socket = io.connect("http://192.168.0."+i+":8081");
    socket.emit("discover");
    i++;
    if( i > 254)
        clearInterval(timer);

    socket.on('coreDetected', function(message){
        console.log("Core detected : "+message.ip+" , status : "+message.status);
    });
}, 50);*/


//var socket = io.connect("http://192.168.1.18:8081");

//socket.emit("addPlayer",{"pseudo":"test"});

//socket.emit("selectTowerTest",1);

//socket.emit("putTowerTest",0);

//socket.emit("isReadyTest",true);

