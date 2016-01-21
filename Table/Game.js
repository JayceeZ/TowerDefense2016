/**
 * Created by alex on 14/01/16.
 */
var User = require('./User.js'),
    Tower = require('./Tower.js');

module.exports = function(pmax,socket){
    this.creating = true;
    this.status = "";
    this.maxPlayers = pmax;
    this.players = [];
    this.vague = 0;
    this.ennemyVague = [5,10,15];
    this.map;
    this.radiusTower = 5;
    this.socket = socket;
    this.clock = 0;
    this.stopVague = false;
    this.timer;
    this.INTERVAL = 33;

    this.addPlayer = function(player){
        this.players.push(player);
    }

    this.setMap = function(map){
        this.map = map;
    }

    this.setPlayerTag = function(idplayer,idtag){
        this.getPlayerFromId(idplayer).setMarkerid(idtag);
    }

    this.launch = function(){
        this.creating = false;
        this.status = "placement";
        this.launchPlacement();
    };

    this.readyToLaunch = function(){
        for(i = 0; i < this.players.length; i++){
            if(typeof this.players[i].tag === 'undefined')
                return false;
        }
        return true;
    };

    this.launchPlacement = function(){
        var i;
        for(i = 0; i < this.players.length; i++)
            this.players[i].ready = false;
        this.socket.emit("launchPlacement");
    };

    this.endPlacement = function(){
        this.socket.emit("endPlacement");
    };

    this.launchNextVague = function(){
        this.vague++;
        this.map.initEnemy(this.ennemyVague[this.vague-1],this.socket);
        this.socket.emit("launchVague",this.vague);
        this.clock = 0;
        this.timer = setInterval("this.loopVague()",this.INTERVAL);
    };

    this.loopVague = function(){
        this.map.actuEnemyPosition();

    };

    this.endVague = function(){
        clearInterval(this.timer);

        socket.emit("endVague");
    };

    this.checkPlacement = function(marker){
        if(this.status !== "placement")
            return false;
        var player = this.getPlayerFromId(marker.playerId);
        if(player !== null) {
            if (player.loopTurretCount < 2 && this.map.checkPlacement(marker.x * map.width, marker.y * map.height, this.radiusTower)
                && this.map.collisionTowers(marker.x*map.width,marker.y* map.height,this.radiusTower) === false)
                return true;
        }
        return false;
    };

    this.getPlayerFromId = function(id){
        for(i = 0; i < this.players.length; i++)
            if(this.players[i].id == id)
                return this.players[i];
    };

    this.addTower = function(idplayer,x,y,angle){
        var player = getPlayerFromId(idplayer);
        var tower = new Tower(x,y,angle,player,this.radiusTower);
        player.addTower(tower);
        return this.map.addTower(tower);
    };

    this.setPlayerReady = function(idplayer,ready){
        this.getPlayerFromId(idplayer).setReady(ready);
        this.checkPlayersReady();
    };

    this.checkPlayersReady = function(){
        var check = true;
        var i;
        for(i = 0; i < players.length; i++)
            if(players[i].ready === false)
                check = false;
        if(check === true)
            this.endPlacement();
    };

    this.getPlayerIdFromMarker = function(id){
        var i;
        for(i = 0; i < this.players.length; i++)
            if(this.players[i].markerid == id)
                return this.players[i].id;
        return null;
    }


}