/**
 * Created by alex on 14/01/16.
 */

module.exports = function(pmax){
    this.creating = true;
    this.maxPlayers = pmax;
    this.players = [];
    this.vague = 0;
    this.map;

    this.addPlayer = function(player){
        players.push(player);
    }

    this.setMap = function(map){
        this.map = map;
    }

    this.launch = function(){
        this.creating = false;
    }

    this.readyToLaunch = function(){
        for(i = 0; i < players.length; i++){
            if(typeof players[i].tag === 'undefined')
                return false;
        }
        return true;
    }


}