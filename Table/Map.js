/**
 * Created by alex on 14/01/16.
 */

module.exports = function(){

    this.height = 0;
    this.width = 0;

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
}