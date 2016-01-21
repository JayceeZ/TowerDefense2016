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

}