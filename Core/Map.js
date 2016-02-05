/**
 * Created by alex on 14/01/16.
 */
var Enemy = require('./Enemy.js'),
    EnemyFactory = require('./EnemyFactory.js');

module.exports = function(id,height,width,zones,starts,ends){

    this.id = id;
    this.height = height;
    this.width = width;
    this.towers = [];
    this.enemies = [];
    this.projectiles = [];
    this.ID_ENEMY = 0;
    this.ID_TOWER = 0;
    this.escaped = 0;
    this.kills = 0;
    this.totalScore = 0;
    this.enemyStarts = starts;
    this.enemyEnds = ends;

    this.distance = function(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(y2 - y1,2) + Math.pow(x2 - x1,2));
    };

    this.checkPlacement = function(x,y,radius){
        var i;
        for(i = 0; i < this.enemyZones.length; i++){
            var zone =  this.enemyZones[i];
            if((x + radius <= zone.x1 || x - radius >= zone.x2 || y + radius <= zone.y1 || y - radius >= zone.y2) === false)
                return false;
        }
        return true;
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
        var i;
        for(i = 0; i < n; i++){
            this.ID_ENEMY++;
            var enemyData = EnemyFactory(1);
            var start = this.getRandomStartPoint();
            var path = this.getPathFromStartPoint(start,enemyData.vitesse);
            var j;
            console.log("test path : "+path.points.length);
            for(j = 0; j < path.points.length; j++)
                console.log("point : "+path.points[j].x+" "+path.points[j].y+" , direction : "+path.directions[j].vx+" "+path.directions[j].vy);

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
        var i = Math.floor((Math.random() * (this.enemyStarts.length)));
        var start = this.enemyStarts[i];
        return {"x":Math.floor((Math.random()*(start.x2-start.x1))+start.x1),"y":Math.floor((Math.random()*(start.y2-start.y1))+start.y1)};
    };

    this.getPathFromStartPoint = function(start,speed){
        var possiblepaths = [];
        var i;
        for(i = 0; i < this.possiblePaths.length; i++)
            if(start.x >= this.possiblePaths[i][0].x1 && start.x <= this.possiblePaths[i][0].x2 && start.y >= this.possiblePaths[i][0].y1 && start.x <= this.possiblePaths[i][0].y2){
                possiblepaths.push(this.possiblePaths[i]);
            }
        i = Math.floor((Math.random() * (possiblepaths.length)));
        var currentpath = possiblepaths[i];
        var path = {"points":[],"directions":[]};
        var currentPos = {"x":start.x,"y":start.y};
        for(i = 0; i < currentpath.length - 1; i++){
            console.log("Current pos : "+currentPos.x+" "+currentPos.y);
            var dx = 0,dy = 0,ix = 0,iy = 0,sx = 0,sy = 0;
            ix = currentpath[i+1].x2 -currentpath[i+1].x1;
            iy = currentpath[i+1].y2 -currentpath[i+1].y1;
            if(currentPos.x < currentpath[i+1].x1 || currentPos.x > currentpath[i+1].x2) {
                dx = Math.min(Math.abs(currentPos.x - currentpath[i + 1].x2), Math.abs(currentPos.x - currentpath[i + 1].x1));
                sx = (currentPos.x - currentpath[i + 1].x2)/(currentPos.x - currentpath[i + 1].x2);
            }
            if(currentPos.y < currentpath[i+1].y1 || currentPos.y > currentpath[i+1].y2){
                dy = Math.min(Math.abs(currentPos.y - currentpath[i + 1].y2), Math.abs(currentPos.y - currentpath[i + 1].y1));
                sy = (currentPos.y - currentpath[i + 1].y2)/(currentPos.y - currentpath[i + 1].y2);
            }
            var directions = [];
            if(dx !== 0)
                directions.push({"vx":sx,"vy":0});
            if(dy !== 0)
                directions.push({"vx":0,"vy":sy});
            var testx = currentPos.x + sx * dx + 1;
            if(directions.length === 2 && (testx < currentpath[i].x1 || testx > currentpath[i].x2))
                directions.reverse();
            var a, mx, my;
            console.log("test : "+dx+" "+dy+" "+ix+" "+iy+" "+sx+" "+sy);
            for(a = 0; a < directions.length; a++) {
                path.directions.push(directions[a]);
                if((i === currentpath.length - 2 || i === currentpath.length - 3) && a === directions.length - 1) {
                    mx = directions[a].vx * dx;
                    my = directions[a].vy * dy;
                }
                else {
                    mx = directions[a].vx * (dx + Math.floor(Math.random() * ix));
                    my = directions[a].vy * (dy + Math.floor(Math.random() * iy));
                }
                if(mx !== 0) {
                    mx -= mx % speed;
                    if (currentPos.x + mx < currentpath[i+1].x1 || currentPos.x + mx > currentpath[i+1].x2)
                        mx += directions[a].vx * speed;
                }
                if(my !== 0) {
                    my -= my % speed;
                    if (currentPos.y + my < currentpath[i+1].y1 || currentPos.y + my > currentpath[i+1].y2)
                        my += directions[a].vy * speed;
                }
                currentPos.x += mx;
                currentPos.y += my;
                console.log("test : "+mx+" "+my);
                path.points.push({"x":currentPos.x,"y":currentPos.y});
            }
        }
        return path;
        //return {"points":[{"x":this.width,"y":start.y}],"directions":[{"vx":1,"vy":0}]};
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
                this.projectiles.splice(i,1);
                i--;
                l--;
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
            }
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

    this.computeZones = function(zones,starts,ends){
        var computedZones = [];
        var i;
        for(i = 0; i < zones.length; i++)
            computedZones.push({"x1":zones[i].x1,"x2":zones[i].x2,"y1":zones[i].y1,"y2":zones[i].y2, "neighbors": null,"start":null,"end":null});

        for(i = 0; i < computedZones.length; i++){
            computedZones[i].neighbors = [];
            var j;
            for(j = 0; j < computedZones.length;j++){
                if(i !== j){
                    var neighbor = false;
                    if(computedZones[i].x1 === computedZones[j].x2)
                        neighbor = true;
                    else if(computedZones[i].x2 === computedZones[j].x1)
                        neighbor = true;
                    else if(computedZones[i].y1 === computedZones[j].y2)
                        neighbor = true;
                    else if(computedZones[i].y2 === computedZones[j].y1)
                        neighbor = true;
                    if(neighbor === true)
                        computedZones[i].neighbors.push(computedZones[j]);
                }
            }
            for(j = 0; j < starts.length; j++)
                if((computedZones[i].x2 <= starts[j].x1 || computedZones[i].x1 >= starts[j].x2 || computedZones[i].y2 <= starts[j].y1 || computedZones[i].y1 >= starts[j].y2) === false)
                    computedZones[i].start = starts[j];
            for(j = 0; j < ends.length; j++)
                if((computedZones[i].x2 <= ends[j].x1 || computedZones[i].x1 >= ends[j].x2 || computedZones[i].y2 <= ends[j].y1 || computedZones[i].y1 >= ends[j].y2) === false)
                    computedZones[i].end = ends[j];
        }
        return computedZones;
    };

    this.computePaths = function(){
        var paths = [];
        var i;
        for(i = 0; i < this.enemyZones.length;i++){
            if(this.enemyZones[i].start !== null){
                var path = [];
                path.push(this.enemyZones[i]);
                this.findPaths(path,paths);
            }
        }
        return paths;
    };

    this.findPaths = function(path,paths){
        var j;
        var current = path[path.length-1];
        if(current.end !== null){
            var copy = [];
            for(j = 0; j < path.length; j++)
                copy.push(path[j]);
            copy.push(current.end);
            paths.push(copy);
        }else{
            for(j = 0; j < current.neighbors.length;j++){
                var a;
                var found = false;
                for(a = 0; a < path.length; a++)
                    if(path[a] === current.neighbors[j]) {
                        found = true;
                        break;
                    }
                if(found === false){
                    path.push(current.neighbors[j]);
                    this.findPaths(path,paths);
                    path.pop();
                }
            }
        }

    };

    this.enemyZones = this.computeZones(zones,starts,ends);
    this.possiblePaths = this.computePaths();

};