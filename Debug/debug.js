/**
 * Created by alex on 19/02/16.
 */

var socket = io.connect("http://localhost:8081");

var TX_STEP = 0.005;
var TY_STEP = 0.005;
var ROT_STEP = 1;

function updateMarker(){
    sendUpdateMarker(getMarker());
}

function translationX(){
    var tx = 1*document.getElementById("updateMarkerTx").value;
    if(tx !== 0) {
        var signe = 1;
        if (tx < 0)
            signe = -1;
        runTx(tx, signe);
    }
}

function runTx(tx,signe){
    document.getElementById("updateMarkerX").value = (1*document.getElementById("updateMarkerX").value)+signe*TX_STEP;
    sendUpdateMarker(getMarker());
    tx -= signe*TX_STEP;
    var cur_signe = 1;
    if(tx === 0)
        cur_signe = -signe;
    else if(tx < 0 )
        cur_signe = -1;
    if(signe === cur_signe) {
        setTimeout(runTx(tx,signe), 100);
    }
};

function translationY(){
    var ty = 1*document.getElementById("updateMarkerTy").value;
    if(ty !== 0) {
        var signe = 1;
        if (ty < 0)
            signe = -1;
        runTy(ty, signe);
    }
}

function runTy(ty,signe){
    document.getElementById("updateMarkerY").value = (1*document.getElementById("updateMarkerY").value)+signe*TY_STEP;
    sendUpdateMarker(getMarker());
    ty -= signe*TY_STEP;
    var cur_signe = 1;
    if(ty === 0)
        cur_signe = -signe;
    else if(ty < 0 )
        cur_signe = -1;
    if(signe === cur_signe) {
        setTimeout(runTy(ty,signe), 100);
    }
}

function rotation(){
    var r = 1*document.getElementById("updateMarkerRot").value;
    if(r !== 0) {
        var signe = 1;
        if (r < 0)
            signe = -1;
        runRotation(r, signe);
    }
}

function runRotation(r,signe){
    document.getElementById("updateMarkerAngle").value = (1*document.getElementById("updateMarkerAngle").value)+signe*ROT_STEP;
    sendUpdateMarker(getMarker());
    r -= signe*ROT_STEP;
    var cur_signe = 1;
    if(r === 0)
        cur_signe = -signe;
    else if(r < 0 )
        cur_signe = -1;
    if(signe === cur_signe) {
        setTimeout(runRotation(r,signe), 100);
    }
}

function getMarker(){
    var id = document.getElementById("updateMarkerId").value;
    var x = document.getElementById("updateMarkerX").value;
    var y = document.getElementById("updateMarkerY").value;
    var angle = (document.getElementById("updateMarkerAngle").value * 2 * 3.14 )/ 360;
    return {"id":id,"x":x,"y":y,"angle":angle};
}

function sendUpdateMarker(marker){
    this.socket.emit("debugUpdateMarker",marker);
}

function removeMarker(){
    this.socket.emit("debugRemoveMarker",document.getElementById("removeMarkerId").value);
}