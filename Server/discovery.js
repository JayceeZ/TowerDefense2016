/**
 * Created by alex on 10/02/16.
 */


var targets = [];
var timer;
var discoveries = [];

function initDiscovery(){
    discoveries = [];
    console.log("init discovery");
    for(j = 1; j < 2; j++){
        for(i = 0; i < 255; i++){
            discoveries.push(new discovery("http://192.168."+j+"."+i+":8081"));
        }
    }
    setTimeout(function(){
        var a;
        for(a = 0; a < discoveries.length; a++)
            discoveries[a].socket.close();
    },1000);
};

function addTarget(ip,status,players){
    var i;
    var found = false;
    for(i = 0; i < targets.length; i++)
        if(targets[i].ip === ip) {
            found = true;
            targets[i].status = status;
            targets[i].players = players;
            $('.gameTable tr')[i].text("<td>"+ip+"</td><td>"+players+"</td>");
            break;
        }
    if(found === false) {
        targets.push({"ip": ip, "status": status, "players": players});
        $('.gameTable').append("<tr><td>"+ip+"</td><td>"+players+"</td></tr>");
    }
};

var discovery = function(target){
    this.socket = io.connect(target);
    this.socket.emit("discoverGame");

    this.socket.on('discoveringGame', function(message){
        addTarget(target,message.status, message.players);
    });
};
