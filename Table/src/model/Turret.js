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

var Projectile = function Projectile(container) {
  this.length = 0;
  this.x = 0;
  this.y = 0;
  this.speed = 0;
  this.orientation = 0;
  this.interval = undefined;

  this.graphics = new PIXI.Graphics();
  this.container = container;

  this.setSpeed = function(speed) {
    this.speed = speed;
  };

  this.setLength = function(length) {
    this.length = length;
  };

  this.setOrientation = function(orientation) {
    this.orientation = orientation;
  };

  this.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
  };

  this.step = function() {
    if(this.speed != 0) {
      this.x += this.speed * Math.cos(this.orientation);
      this.y += this.speed * Math.sin(this.orientation);
    }
  };

  this.fire = function() {
    var _this = this;
    this.interval = setInterval(function() {
      _this.step();
      _this.graphics.clear();
      _this.graphics.lineStyle(2, 0x0000FF, 1);
      _this.graphics.moveTo(_this.x, _this.y);
      _this.graphics.lineTo(_this.x + _this.length * Math.cos(_this.orientation), _this.y+_this.length*Math.sin(_this.orientation));
    }, this.speed);
  };

  this.destroy = function() {
    clearInterval(this.interval);
    this.container.removeChild(this.graphics);
  };

  container.addChild(this.graphics);
};