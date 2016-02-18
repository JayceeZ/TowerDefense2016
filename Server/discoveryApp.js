/**
 * Created by alex on 18/02/16.
 */


var timer;
var discoveries = [];

var mode = "creating";

function initDiscovery(){
    discoveries = [];
    console.log("init discovery");
    for(j = 1; j < 2; j++){
        for(i = 0; i < 255; i++){
            discoveries.push(new discovery("http://192.168."+j+"."+i+":8081"));
        }
    }
    setTimeout(function(){
        disconnectAll();
    },1000);
};

var discovery = function(target){
    this.socket = io.connect(target);
    this.socket.emit("discoverGame");
    this.socket.on('discoveringGame', function(message){
        if(message.status === mode)
            selectGame(target);
    });
};

function selectGame(ip){
    disconnectAll();
}

function disconnectAll(){
    var a;
    for(a = 0; a < discoveries.length; a++)
        discoveries[a].socket.close();
}