/**
 * Represents a turret on the map
 */

var Turret = function Turret(id, container) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.orientation = 0;

  this.range = 100;
  this.cadence = 10;
  this.duration = 20;
  this.speed = 2;

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

  this.fire = function() {
    var p = new Projectile(this.container);
    p.setPosition(this.x, this.y);
    p.setOrientation(this.orientation);
    p.setSpeed(this.speed);
    p.setLength(10);
    p.fire();
  };

  this.update = function() {
    this.graphics.clear();
    this.graphics.lineStyle(0);
    this.graphics.beginFill(0xFFCC00, 1);
    this.graphics.drawCircle(this.x, this.y, 20);
    this.graphics.endFill();
  };

  container.addChild(this.graphics);
};