/**
 * Created by alex on 14/01/16.
 */
var Enemy = require('./Enemy.js'),
    EnemyFactory = require('./EnemyFactory.js');

module.exports = function(){

    this.height = 0;
    this.width = 0;
    this.towers = [];
    this.enemies = [];
    this.projectiles = [];
    this.ID_ENEMY = 0;
    this.ID_TOWER = 0;
    this.escaped = 0;
    this.kills = 0;
    this.totalScore = 0;

    this.setHeight = function(h){
        this.height = h;
    };

    this.setWidth = function(w){
        this.width = w;
    };

    this.distance = function(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(y2 - y1,2) + Math.pow(x2 - x1,2));
    };

    this.checkPlacement = function(x,y,radius){
        if(y+radius < 300 || y-radius > 700)
            return true;
        return false;
    };

    this.collisionTowers = function(x,y,radius){
        var i;
        for(i = 0; i < this.towers.length;i++)
            if(this.distance(x,y,this.towers[i].x,this.towers[i].y) < radius + this.towers[i].radius)
                return true;
        return false;
    };

    this.addTower = function(tower){
        this.ID_TOWER++;
        tower.id = this.ID_TOWER;
        this.towers.push(tower);
        return this.ID_TOWER;
    };

    this.initNewVague = function(){
        this.enemies = [];
        this.projectiles = [];
        this.escaped = 0;
        this.kills = 0;
        var i;
        for(i = 0; i < this.towers.length;i++)
            this.towers[i].resetFire();
    };

    this.initEnemy = function(n,socket){
        for(i = 0; i < n; i++){
            this.ID_ENEMY++;
            var start = this.getRandomStartPoint();
            var path = this.getPathFromStartPoint(start);
            var enemyData = EnemyFactory(1);
            if(enemyData !== null) {
                var enemy = new Enemy(this.ID_ENEMY, start.x, start.y, enemyData.hp, enemyData.gain, enemyData.damage, enemyData.vitesse, path.points, path.directions);
                this.enemies.push(enemy);
                socket.emit("initEnemy", {
                    "id": this.ID_ENEMY,
                    "vitesse": enemy.vitesse,
                    "start": start,
                    "pathPoints": path.points,
                    "pathDirections": path.directions,
                    "hp":enemy.hp
                });
            }
        }
    };

    this.getRandomStartPoint = function(){
        return {"x":0, "y":Math.floor((Math.random() * 380) + 320)};
    };

    this.getPathFromStartPoint = function(start){
        return {"points":[{"x":this.width,"y":start.y}],"directions":[{"vx":1,"vy":0}]};
    };

    this.actuEnemyPosition = function(socket,clock){
        var escape = 0;
        var i;
        var l = this.enemies.length;
        for(i = 0; i < l; i++)
            if(this.enemies[i].actuPosition() === true) {
                socket.emit("enemyEscape",{"id":this.enemies[i].id,"t":clock});
                this.enemies.splice(i,1);
                i--;
                l--;
                escape++;
            }
        if(escape !== 0){
            this.escaped += escape;
            socket.emit("updateEscaped",this.escaped);
        }
    };

    this.updateProjectiles = function(socket, clock,vague){
        // UPDATES
        var i;
        var kill = 0;
        var l = this.projectiles.length;
        for(i = 0; i < l; i++){
            if(this.projectiles[i].updateCount() === true){
                var targets = this.projectiles[i].getTargets();
                var j;
                for(j = 0; j < targets.length; j++)
                    if(targets[j].dead === false && targets[j].shot(this.projectiles[i],socket,clock,vague) === true) {
                        kill++;
                        this.projectiles[i].tower.updateKills(targets[j].gain);
                        this.totalScore += targets[j].gain;
                        this.removeEnemy(targets[j].id);
                    }
            }
        }
        if(kill !== 0){
            this.kills += kill;
            socket.emit("updateKills",this.kills);
        }
        // NEW PROJECTILES
        for(i = 0; i < this.towers.length; i++){
            var projectile = this.towers[i].onFire(this.enemies,socket,clock);
            if(projectile !== null) {
                this.projectiles.push(projectile);
                projectile.tower.updateShots();
            };
        }

    };

    this.removeEnemy = function(enemyId){
        var i;
        for(i = 0; i < this.enemies.length; i++)
            if(enemyId === this.enemies[i].id){
                this.enemies.splice(i,1);
                break;
            }
    };

};