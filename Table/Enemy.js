/**
 * Created by alex on 14/01/16.
 */

module.exports = function(id,x,y,points,directions){

    this.id = id;
    this.x = x;
    this.y = y;
    this.pathPoints = points;
    this.pathDirections = directions;
    this.indexPath = 0;
    this.vitesse = 2;

    this.actuPosition = function(){
        this.x += this.vitesse * this.pathDirections[this.indexPath].vx;
        this.y += this.vitesse * this.pathDirections[this.indexPath].vy;

    }

}