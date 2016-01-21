/**
 * Represents a turret on the map
 */

var Turret = function Turret(id, container) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.orientation = 0;
  this.size = 50;

  this.container = container;
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
    this.graphics.clear();
    this.graphics.lineStyle(0);
    this.graphics.beginFill(0xFFCC00, 1);
    this.graphics.drawCircle(this.x, this.y, this.size);
    this.graphics.endFill();

    this.graphics.lineStyle(2, 0x0000FF, 1);
    this.graphics.moveTo(this.x, this.y);
    this.graphics.lineTo(this.x + this.size*Math.cos(this.orientation), this.y + this.size*Math.sin(this.orientation));
  };

  container.addChild(this.graphics);
};