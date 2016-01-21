/**
 * Created by alex on 14/01/16.
 */
var Enemy = require('./Enemy.js');

module.exports = function(){

    this.height = 0;
    this.width = 0;
    this.towers = [];
    this.enemy = [];
    this.ID_ENEMY = 0;

    this.setHeight = function(h){
        this.height = h;
    };

    this.setWidth = function(w){
        this.width = w;
    };

    this.distance = function(x1, y1, x2, y2) {
        return Math.sqrt(sqr(y2 - y1) + sqr(x2 - x1));
    };

    this.checkPlacement = function(x,y,radius){
        if(y+radius < 30 || y-radius > 70)
            return true;
        return false;
    };

    this.collisionTowers = function(x,y,radius){
        var i;
        for(i = 0; i < this.towers.length;i++)
            if(this.distance(x,y,towers[i].x,towers[i].y) < radius + towers[i].radius)
                return true;
        return false;
    };

    this.addTower = function(tower){
        this.towers.push(tower);
    };

    this.initEnemy = function(n,socket){
        for(i = 0; i < n; i++){
            this.ID_ENEMY++;
            var start = getRandomStartPoint();
            var path = getPathFromStartPoint(start);
            this.enemy.push(new Enemy(this.ID_ENEMY,start.x,start.y,path.points,path.directions));
            this.socket.emit("initEnemy",{"id":this.ID_ENEMY,"start":start,"pathPoints":path.points,"pathDirections":path.directions});
        }
    };

    this.getRandomStartPoint = function(){
        return {"x":0, "y":Math.floor((Math.random() * 38) + 32)};
    }

    this.getPathFromStartPoint = function(start){
        return {"points":[{"x":this.width,"y":start.y}],"directions":[{"vx":1,"vy":0}]};
    }
}