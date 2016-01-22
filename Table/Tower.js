/**
 * Created by alex on 14/01/16.
 */
var Projectile = require('./Projectile.js');

module.exports = function(x,y,angle,player,radius){

    this.id = 0;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.player = player;
    this.radius = radius;
    this.reloading = false;
    this.reloadtime = 50;
    this.reloadcount = 0;
    this.firespeed = 10;

    this.radiusrange = 30;

    this.resetFire = function(){
        this.reloading = false;
        this.reloadcount = 0;
    };

    this.onFire = function(enemies,socket,clock){
        if(this.reloadcount >= this.reloadtime)
            this.reloading = false;
        if(this.reloading === false){
            var targets = getEnemiesInRange(enemies);
            var target = getBestTarget(enemies);
            if(target !== null){
                this.reloading = true;
                this.reloadcount = 0;
                var projectile = new Projectile(target.x,target.y,this.firespeed,this);
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
            if(this.isInRange(enemies[i]) === true)
                targets.push(enemies[i]);
        return targets;
    };

    this.isInRange = function(enemy){
        // TO DO
        if(Math.sqrt(Math.pow(this.x - enemy.x,2) + Math.pow(this.y - enemy.y,2)) < this.radiusrange)
            return true;
        return false;
    };

    this.getBestTarget = function(enemies){
        if(enemies.length > 0){
            var prediction = enemies[0].getPrediction(this.firespeed);
            return {"x":prediction.x,"y":prediction.y};
        }
        return null;
    };


};