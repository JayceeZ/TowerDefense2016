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

    this.checkPlacement = function(x,y,radius){
        if(y+radius < 30 || y-radius > 70)
            return true;
        return false;
    }

    this.addTower = function(tower){
        towers.push(tower);
    }

    this.initEnemy = function(n,socket){
        for(i = 0; i < n; i++){
            this.ID_ENEMY++;
            start = getRandomStartPoint();
            path = getPathFromStartPoint(start);
            enemy.push(new Enemy(ID_ENEMY,start.x,start.y,path.points,path.directions));
            socket.emit("initEnemy",{"id":ID_ENEMY,"start":start,"pathPoints":path.points,"pathDirections":path.directions});
        }
    }

    this.getRandomStartPoint = function(){
        return {"x":0, "y":Math.floor((Math.random() * 38) + 32)};
    }

    this.getPathFromStartPoint = function(start){
        return {"points":[{"x":this.width,"y":start.y}],"directions":[{"vx":1,"vy":0}]};
    }
}