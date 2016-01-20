/**
 * Created by alex on 14/01/16.
 */

module.exports = function(id,pseudo){

    this.id = id;
    this.pseudo = pseudo;
    this.score;
    this.ready = false;
    this.markerid = null;
    this.markerStatus = "unknown";
    this.loopTurretCount = 0;
    this.towers = [];

    this.setPseudo = function(p){
        this.pseudo = p;
    };

    this.setScore = function(s){
        this.score = s;
    }

    this.setReady = function(r){
        this.ready = r;
    }

    this.setMarkerid = function(id){
        this.markerid = id;
    }

    this.updateMarker = function(marker){

    }

    this.addTower = function(tower){
        towers.push(tower);
    }
};