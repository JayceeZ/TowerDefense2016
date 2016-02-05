/**
 * Created by alex on 21/01/16.
 */

module.exports = function(x,y,count,tower,damage){

    this.targetX = x;
    this.targetY = y;
    this.count = count;
    this.tower = tower;
    this.singleTarget;
    this.damage = damage;

    this.getTargets = function(){
        var targets = [];

        targets.push(this.singleTarget);

        return targets;
    };

    this.setSingleTarget = function(target){
        this.singleTarget = target;
    };

    this.updateCount = function(){
        count--;
        if(count === 0)
            return true;
        return false;
    }
};