/**
 * Created by alex on 14/01/16.
 */
var Projectile = require('./Projectile.js');

module.exports = function(type,x,y,angle,player,radius,reloadtime, firespeed, damage, rangelength, rangeradius){

    this.id = 0;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.player = player;
    this.radius = radius;
    this.reloading = false;
    this.reloadtime = reloadtime;
    this.reloadcount = 0;
    this.firespeed = firespeed;
    this.damage = damage;
    this.kills = 0;
    this.shots = 0;
    this.type = type;
    this.rangelength = rangelength;
    this.rangeradius = rangeradius;

    this.resetFire = function(){
        this.reloading = false;
        this.reloadcount = 0;
    };

    this.onFire = function(enemies,socket,clock){
        if(this.reloadcount >= this.reloadtime)
            this.reloading = false;
        if(this.reloading === false){
            var targets = this.getEnemiesInRange(enemies);
            var target = this.getBestTarget(targets);
            if(target !== null){
                this.reloading = true;
                this.reloadcount = 0;
                var projectile = new Projectile(target.x,target.y,this.firespeed,this,this.damage);
                projectile.setSingleTarget(enemies[0]);
                socket.emit("projectile",{"t1":clock,"launcher":{"x":this.x,"y":this.y},"t2":clock+this.firespeed,"target":target});
                return projectile;
            }
        }else this.reloadcount++;
        return null;
    };

    this.getEnemiesInRange = function(enemies){
        var targets = [];
        var i;
        for(i = 0; i < enemies.length; i++)
            if(this.isInRange(enemies[i]) === true) {
                targets.push(enemies[i]);
            }
        return targets;
    };

    this.isInRange = function(enemy){
        if(Math.sqrt(Math.pow(this.x - enemy.x,2) + Math.pow(this.y - enemy.y,2)) <= this.rangelength) {
            var p1 = {"x":this.x+this.radius*Math.cos(this.angle-this.rangeradius),"y":this.y+this.radius*Math.sin(this.angle-this.rangeradius)};
            var d1 = {"c":(p1.y-this.y)/(p1.x-this.x),"h":0};
            d1.h = this.y - d1.c * this.x;
            if(this.isAbove(d1,{"x":enemy.x,"y":enemy.y}) === true)
                return false;
            var p2 = {"x":this.x+this.radius*Math.cos(this.angle+this.rangeradius),"y":this.y+this.radius*Math.sin(this.angle+this.rangeradius)};
            var d2 = {"c":(p2.y-this.y)/(p2.x-this.x),"h":0};
            d2.h = this.y - d1.c * this.x;
            if(this.isAbove(d2,{"x":enemy.x,"y":enemy.y}) === false)
                return false;
            return true;
        }
        return false;
    };

    this.isAbove = function(droite,point){
        if(point.y > droite.c * point.x + droite.h)
            return true;
    };

    this.getBestTarget = function(enemies){
        if(enemies.length > 0){
            var prediction = enemies[0].getPrediction(this.firespeed);
            return {"x":prediction.x,"y":prediction.y};
        }
        return null;
    };

    this.updateKills= function(gain){
        this.kills++;
        this.player.updateKills(gain);
    };

    this.updateShots = function(){
        this.shots++;
        this.player.updateShots();
    };


};