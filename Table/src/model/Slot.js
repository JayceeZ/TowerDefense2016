/**
 * Represents a slot on the table for placement
 */

var Slot = function Slot(id) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.color = [0, 0, 0, 0.2];

  this.setX = function(x) {
    this.x = x;
  };

  this.setY = function(y) {
    this.y = y;
  };

  this.getColorCSS = function() {
    return "rgba("+this.color[0]+","+this.color[1]+","+this.color[2]+","+this.color[3]+")";
  }
};