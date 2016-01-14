/**
 * Created by alex on 14/01/16.
 */

module.exports = function(id){

    this.id = id;
    this.pseudo;
    this.score;
    this.ready;

    this.setPseudo = function(p){
        this.pseudo = p;
    };

    this.setScore = function(s){
        this.score = s;
    }

    this.setReady = function(r){
        this.ready = r;
    }
};