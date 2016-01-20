/**
 * Created by alex on 14/01/16.
 */

module.exports = function(pmax){
    this.creating = true;
    this.status = "";
    this.maxPlayers = pmax;
    this.players = [];
    this.vague = 0;
    this.map;
    this.radiusTower = 5;

    this.addPlayer = function(player){
        this.players.push(player);
    }

    this.setMap = function(map){
        this.map = map;
    }

    this.launch = function(){
        this.creating = false;
        this.status = "placement";
    }

    this.readyToLaunch = function(){
        for(i = 0; i < players.length; i++){
            if(typeof players[i].tag === 'undefined')
                return false;
        }
        return true;
    }

    this.loopVague = function(){

    }

    this.checkPlacement = function(marker){
        player = getPlayerFromId(marker.playerId);
        if(player.loopTurretCount < 2 && map.checkPlacement(marker.x*map.width,marker.y*map.height,towerRadius))
            return true;
        return false;
    }

    this.getPlayerFromId = function(id){
        for(i = 0; i < this.players.length; i++)
            if(this.players[i].id == id)
                return this.players[i];
    }

}