/**
 * Represents a turret on the map
 */

var Turret = function Turret(id) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.orientation = 0;
  this.graphics = new PIXI.Graphics();

  this.setOrientation = function(orientation) {
    this.orientation = orientation;
    this.update();
  };

  this.setPosition = function(x,y) {
    this.x = x;
    this.y = y;
    this.update();
  };

  this.update = function() {
    this.graphics.lineStyle(0);
    this.graphics.beginFill(0xFFCC00, 1);
    this.graphics.drawCircle(this.x, this.y, 20);
    this.graphics.endFill();
  }
};