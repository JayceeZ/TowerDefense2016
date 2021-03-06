/**
 * Created by alex on 14/01/16.
 */

module.exports = function(id,x,y,hp,gain,damage,vitesse,points,directions){

    this.id = id;
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.hpmax = hp;
    this.gain = gain;
    this.damage = damage;
    this.pathPoints = points;
    this.pathDirections = directions;
    this.indexPath = 0;
    this.vitesse = vitesse;
    this.dead = false;

    this.actuPosition = function(){
        this.x += this.vitesse * this.pathDirections[this.indexPath].vx;
        this.y += this.vitesse * this.pathDirections[this.indexPath].vy;
        return this.checkEnd();
    };

    this.checkEnd = function(){
        if(this.x === this.pathPoints[this.indexPath].x && this.y === this.pathPoints[this.indexPath].y)
            this.indexPath++;
        if(this.indexPath === this.pathPoints.length)
            return true;
        else
            return false;
    };

    this.shot = function(projectile,socket, clock,vague){
        this.hp -= projectile.damage;
        if(this.hp > 0){
            socket.emit("updateEnemyHp",{"id":this.id,"t":clock,"hp":this.hp/this.hpmax});
            return false;
        }
        else {
            socket.emit("killEnemy",{"id":this.id,"t":clock,"idplayer":projectile.tower.player.id,"vague":vague});
            this.dead = true;
            return true;
        }
    };

    this.getPrediction = function(n){
        var x = this.x;
        var y = this.y;
        var index = this.indexPath;
        var i;
        for(i = 0; i < n; i++){
            x += this.vitesse * this.pathDirections[index].vx;
            y += this.vitesse * this.pathDirections[index].vy;
            if(x === this.pathPoints[index] && y === this.pathPoints[index])
                index++;
        }
        return {"x":x,"y":y};
    };


};