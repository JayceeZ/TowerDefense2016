/**
 * Created by alex on 14/01/16.
 */

module.exports = function(id,pseudo){

    this.id = id;
    this.pseudo = pseudo;
    this.score;
    this.ready;
    this.marker = {"id" : 0, "x": -1, "y": -1, "angle": -1};
    this.markerStatus = "unknown";

    this.setPseudo = function(p){
        this.pseudo = p;
    };

    this.setScore = function(s){
        this.score = s;
    }

    this.setReady = function(r){
        this.ready = r;
    }

    this.updateMarker = function(marker){

    }
};