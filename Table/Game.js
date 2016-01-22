/**
 * Created by alex on 14/01/16.
 */
var User = require('./User.js'),
    Tower = require('./Tower.js');

module.exports = function(pmax,socket){
    var oThis = this;
    this.creating = true;
    this.status = "";
    this.maxPlayers = pmax;
    this.players = [];
    this.vague = 0;
    this.nbvague = 3;
    this.ennemyVague = [5,10,15];
    this.map;
    this.radiusTower = 50;
    this.socket = socket;
    this.clock = 0;
    this.stopVague = false;
    this.timer;
    this.INTERVAL = 33;
    this.escaped = 0;

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
        this.launchPlacement();
    };

    this.readyToLaunch = function(){
        for(i = 0; i < this.players.length; i++){
            if(typeof this.players[i].tag === 'undefined')
                return false;
        }
        return true;
    };

    this.endGame = function (){
        socket.emit("endGame");
    }

    /**
     * ------------------------   PHASE  DE  PLACEMENT   ----------------------------------------------------------
     */

    this.launchPlacement = function(){
        this.status = "placement";
        var i;
        for(i = 0; i < this.players.length; i++) {
            this.players[i].ready = false;
            this.players[i].turretCount = 0;
        }
        this.socket.emit("launchPlacement");
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

    this.addTower = function(idplayer,markerx,markery,angle){
        var player = this.getPlayerFromId(idplayer);
        var tower = new Tower(markerx*this.map.width,markery*this.map.height,angle,player,this.radiusTower);
        player.addTower(tower);
        player.turretCount++;
        this.map.addTower(tower);
        return tower;
    };

    this.setPlayerReady = function(idplayer,ready){
        if(this.status === "placement") {
            this.getPlayerFromId(idplayer).setReady(ready);
            this.checkPlayersReady();
        }
    };

    this.checkPlayersReady = function(){
        var check = true;
        var i;
        for(i = 0; i < this.players.length; i++)
            if(this.players[i].ready === false)
                check = false;
        if(check === true)
            this.endPlacement();
    };

    this.endPlacement = function(){
        this.socket.emit("endPlacement");
        this.launchNextVague();
    };

    /**
     * ------------------------   PHASE  DE  VAGUE   ----------------------------------------------------------
     */

    this.launchNextVague = function(){
        this.vague++;
        this.status = "vague";
        this.map.initNewVague();
        this.map.initEnemy(this.ennemyVague[this.vague-1],this.socket);
        this.socket.emit("launchVague",this.vague);
        this.clock = 0;
        this.timer = setInterval(function(){ oThis.loopVague()},this.INTERVAL);
    };

    this.loopVague = function(){
        this.clock++;
        this.map.actuEnemyPosition(this.socket,this.clock);
        this.map.updateProjectiles(this.socket,this.clock);
        if(this.map.enemies.length === 0)
            this.endVague();
    };


    this.endVague = function(){
        clearInterval(this.timer);
        socket.emit("endVague");
        if(this.vague < this.nbvague)
            this.launchPlacement();
        else
            this.endGame();
    };

    this.getPlayerFromId = function(id){
        for(i = 0; i < this.players.length; i++)
            if(this.players[i].id == id)
                return this.players[i];
        return null;
    };

    this.getPlayerIdFromMarker = function(id){
        var i;
        for(i = 0; i < this.players.length; i++)
            if(this.players[i].markerid == id)
                return this.players[i].id;
        return null;
    };


}