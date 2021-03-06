/**
 * Created by alex on 14/01/16.
 */
var User = require('./User.js'),
    Tower = require('./Tower.js'),
    TowerFactory = require('./TowerFactory.js'),
    MapFactory = require('./MapFactory.js'),
    Map = require('./Map.js');

module.exports = function(socket){
    var oThis = this;
    this.creating = true;
    this.status = "";
    this.maxPlayers;
    this.players;
    this.vague;
    this.nbvague = 3;
    this.ennemyVague = [5,10,15];
    this.map;
    this.socket = socket;
    this.clock;
    this.stopVague = false;
    this.timer;
    this.updateTimer;
    this.INTERVAL = 33;
    this.UPDATE_INTERVAL = 1000;
    this.ID = 0;
    this.globalHp;

    this.init = function(nbplayers){
        this.creating = true;
        this.status = "";
        this.maxPlayers = nbplayers;
        this.players = [];
        this.vague = 0;
        this.escaped = 0;
        this.clock = 0;
        this.globalHp = 100;
        var dataMap = MapFactory(2);
        this.map = new Map(dataMap.id,dataMap.height,dataMap.width,dataMap.enemyZones, dataMap.enemyStarts, dataMap.enemyEnds);
        socket.emit("coreStatus","creating");
    };


    this.addPlayer = function(player){
        this.players.push(player);
    };

    this.removePlayer = function(id){
        var i;
        for(i = 0; i < this.players.length; i++)
            if(this.players[i].id === id){
                this.players.splice(i,1);
                break;
            }
    };

    this.setMap = function(map){
        this.map = map;
    };

    this.setPlayerTag = function(idplayer,idtag,color){
        var player = this.getPlayerFromId(idplayer);
        if(player !== null) {
            player.setMarkerid(idtag);
            player.color = color;
        }
    };

    this.launch = function(){
        this.creating = false;
        socket.emit("coreStatus","inGame");
        this.launchPlacement();
        this.clearPlayers();
        this.updateTimer = setInterval(function(){ oThis.loopUpdate()},this.UPDATE_INTERVAL);
    };

    this.clearPlayers = function(){
        var i;
        var l = this.players.length;
        for(i = 0; i < l; i++){
            if(this.players[i].markerid === null) {
                this.players.splice(i,1);
                i--;
                l--;
            }
        }
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
        clearInterval(this.updateTimer);
        this.init(4);
    };

    this.loopUpdate = function(){
        var infoPlayers = [];
        var i;
        for(i = 0; i < this.players.length; i++){
            var player = this.players[i];
            var infoPlayer = {"id":player.id,"pseudo":player.pseudo,"color":player.color,"money":player.money,"score":player.score,
                "nbtowers":player.towerCount,"kills":player.kills,"shots":player.shots,"killsvague":player.killsVague,"shotsvague":player.shotsVague,"mult":player.mult};
            infoPlayers.push(infoPlayer);
        }
        var infoGame = {"id":this.ID,"vague":this.vague,"totalScore":this.map.totalScore,"totalKills":this.map.kills,"totalEscapes":this.map.escaped};
        this.socket.emit("globalUpdate",{"infoPlayers":infoPlayers,"infoGame":infoGame});
    };

    /**
     * ------------------------   PHASE  DE  PLACEMENT   ----------------------------------------------------------
     */

    this.launchPlacement = function(){
        this.vague++;
        this.status = "placement";
        var i;
        for(i = 0; i < this.players.length; i++) {
            this.players[i].ready = false;
            this.players[i].turretCount = 0;
        }
        this.socket.emit("launchPlacement");
    };

    this.setSelectedTower = function(idplayer, type){
        var player = this.getPlayerFromId(idplayer);
        if(player !== null) {
            player.selectedTower = type;
            return true;
        }
        return false;
    };

    this.checkPlacement = function(marker){
        if(this.status !== "placement" || marker === null)
            return false;
        var player = this.getPlayerFromId(marker.playerId);
        var dataTower = TowerFactory(player.selectedTower);
        if(player !== null && dataTower != null) {
            if (player.money >= dataTower.price && this.map.checkPlacement(marker.x * this.map.width, marker.y * this.map.height, dataTower.radius)
                && this.map.collisionTowers(marker.x*this.map.width,marker.y* this.map.height,dataTower.radius) === false)
                return true;
        }
        return false;
    };

    this.addTower = function(idplayer,markerx,markery,angle){
        var player = this.getPlayerFromId(idplayer);
        var dataTower = TowerFactory(player.selectedTower);
        if(player !== null && dataTower != null && player.money >= dataTower.price) {
            var tower = new Tower(dataTower.type,Math.round(markerx * this.map.width), Math.round(markery * this.map.height), angle, player, dataTower.radius,dataTower.reloadtime, dataTower.firespeed, dataTower.damage, dataTower.rangelength, dataTower.rangeradius);
            player.addTower(tower);
            this.map.addTower(tower);
            player.money -= dataTower.price;
            return tower;
        }
        return null;
    };

    this.setPlayerReady = function(idplayer,ready){
        if(this.status === "placement") {
            var player = this.getPlayerFromId(idplayer);
            if(player !== null) {
                player.setReady(ready);
                this.checkPlayersReady();
            }
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

    this.getPreviewTower = function(idplayer){
        if(this.status === "placement" && idplayer !== null){
            var player = this.getPlayerFromId(idplayer);
            if(player !== null && player.selectedTower !== null){
                var dataTower = TowerFactory(player.selectedTower);
                if(dataTower !== null){
                    return {"distance":dataTower.rangelength,"arc":dataTower.rangeradius};
                }
            }
        }
        return null;
    };

    this.endPlacement = function(){
        this.socket.emit("endPlacement");
        var i;
        for(i = 0; i < this.players.length;i++)
            this.players[i].ready = false;
        this.launchNextVague();
    };

    /**
     * ------------------------   PHASE  DE  VAGUE   ----------------------------------------------------------
     */

    this.launchNextVague = function(){
        this.status = "vague";
        this.map.initNewVague();
        this.map.initEnemy(this.ennemyVague[this.vague-1],this.socket);
        this.socket.emit("launchVague",this.vague);
        this.clock = 0;
        var i;
        for(i = 0; i < this.players.length;i++)
            this.players[i].resetVague();
        this.timer = setInterval(function(){ oThis.loopVague()},this.INTERVAL);
    };

    this.loopVague = function(){
        this.clock++;
        this.map.actuEnemyPosition(this.socket,this.clock);
        this.map.updateProjectiles(this.socket,this.clock,this.vague);
        if(this.map.enemies.length === 0)
            this.endVague();
    };


    this.endVague = function(){
        clearInterval(this.timer);
        socket.emit("endVague",this.clock);
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

    this.getPlayerFromPseudo = function(pseudo){
        for(i = 0; i < this.players.length; i++)
            if(this.players[i].pseudo == pseudo)
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

    this.getMarkerIdFromPlayer = function(id){
        var i;
        for(i = 0; i < this.players.length; i++)
            if(this.players[i].id == id)
                return this.players[i].markerid;
        return null;
    };

    this.updateBonusMalus = function(pseudo,mult){
        var player = this.getPlayerFromPseudo(pseudo);
        if(player !== null)
            player.mult = mult;
    }

};