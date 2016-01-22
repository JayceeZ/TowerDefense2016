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
    this.vitesse = 20;

    this.actuPosition = function(){
        this.x += this.vitesse * this.pathDirections[this.indexPath].vx;
        this.y += this.vitesse * this.pathDirections[this.indexPath].vy;
        return this.checkEnd();
    };

    this.checkEnd = function(){
        if(this.x >= this.pathPoints[0].x)
            return true;
        return false;
    };

    this.shot = function(projectile,socket, clock){
        socket.emit("killEnemy",{"id":this.id,"t":clock,"idplayer":projectile.tower.player.id});
        return true;
    };

    this.getPrediction = function(n){
        var x = this.x;
        var y = this.y;
        var i;
        for(i = 0; i < n; i++){
            x += this.vitesse * this.pathDirections[this.indexPath].vx;
            y += this.vitesse * this.pathDirections[this.indexPath].vy;
        }
        return {"x":x,"y":y};
    };

};