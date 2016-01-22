/**
 * Created by alex on 14/01/16.
 */

module.exports = function(id,pseudo){

    this.id = id;
    this.pseudo = pseudo;
    this.score = 0;
    this.money = 0;
    this.ready = false;
    this.markerid = null;
    this.markerStatus = "unknown";
    this.loopTurretCount = 0;
    this.towers = [];
    this.kills = 0;
    this.shots = 0;
    this.killsVague = 0;
    this.shotsVague = 0;


    this.setPseudo = function(p){
        this.pseudo = p;
    };

    this.setScore = function(s){
        this.score = s;
    };

    this.setReady = function(r){
        this.ready = r;
    };

    this.setMarkerid = function(id){
        this.markerid = id;
    };

    this.updateMarker = function(marker){

    };

    this.addTower = function(tower){
        this.towers.push(tower);
    };

    this.updateKills = function(){
        this.kills ++;
        this.killsVague++;
    };

    this.updateShots = function(){
        this.shots++;
        this.shotsVague++;
    };

    this.resetVague = function(){
        this.killsVague = 0;
        this.shotsVague = 0;
    };
};