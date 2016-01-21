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
        //this.loopPlacement();
    }

    this.readyToLaunch = function(){
        for(i = 0; i < this.players.length; i++){
            if(typeof this.players[i].tag === 'undefined')
                return false;
        }
        return true;
    }

    this.loopPlacement = function(){
        var loop = true;
        while(loop == true){
            loop = false;
            for(i = 0; i < this.players.length; i++)
                if(this.players[i].ready == false)
                    loop = true;
        }
        this.launchNextVague();
    }

    this.launchNextVague = function(){
        this.vague++;
        this.map.initEnemy(this.ennemyVague[this.vague-1],this.socket);
        this.socket.emit("launchVague",this.vague);
        this.loopVague();
    }

    this.initEnemy = function(){

    }

    this.loopVague = function(){

    }

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
    }

    this.getPlayerFromId = function(id){
        for(i = 0; i < this.players.length; i++)
            if(this.players[i].id == id)
                return this.players[i];
    }

    this.addTower = function(idplayer,x,y,angle){
        var player = getPlayerFromId(idplayer);
        var tower = new Tower(x,y,angle,player,this.radiusTower);
        player.addTower(tower);
        this.map.addTower(tower);
    }

    this.setPlayerReady = function(idplayer,ready){
        this.getPlayerFromId(idplayer).setReady(ready);
    }

    this.getPlayerIdFromMarker = function(id){
        var i;
        for(i = 0; i < this.players.length; i++)
            if(this.players[i].markerid == id)
                return this.players[i].id;
        return null;
    }


}