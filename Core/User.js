/**
 * Created by alex on 14/01/16.
 */

module.exports = function(id,pseudo){

    this.id = id;
    this.pseudo = pseudo;
    this.score = 0;
    this.money = 100;
    this.ready = false;
    this.markerid = null;
    this.towers = [];
    this.kills = 0;
    this.shots = 0;
    this.killsVague = 0;
    this.shotsVague = 0;
    this.selectedTower = 1;
    this.towerCount = 0;
    this.color = null;
    this.mult = 1;


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
        this.towerCount++;
    };

    this.updateKills = function(gain){
        this.kills ++;
        this.killsVague++;
        this.score += gain*this.mult;
        this.money += gain;
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