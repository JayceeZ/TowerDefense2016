/**
 * Created by alex on 14/01/16.
 */

module.exports = function(id,pseudo){

    this.id = id;
    this.pseudo = pseudo;
    this.score;
    this.ready;
    this.tag;

    this.setPseudo = function(p){
        this.pseudo = p;
    };

    this.setScore = function(s){
        this.score = s;
    }

    this.setTag = function(tag){
        this.tag = tag;
    }

    this.setReady = function(r){
        this.ready = r;
    }
};