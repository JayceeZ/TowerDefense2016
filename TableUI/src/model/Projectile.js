
var Projectile = function Projectile(container) {
  this.length = 20;
  this.x = 0;
  this.y = 0;
  this.toX = 0;
  this.toY = 0;
  this.duration = 0;
  this.speed = 0;
  this.interval = undefined;

  this.graphics = new PIXI.Graphics();
  this.container = container;

  this.setDuration = function(duration) {
    this.duration = duration;
  };

  this.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
  };

  this.setDestination = function(x, y) {
    this.toX = x;
    this.toY = y;
  };

  this.fire = function(delta) {
    var _this = this;
    console.log("Projectile fired : delta = "+delta+" , duration = "+this.duration);

    var dx = (this.toX-this.x) / this.duration;
    var dy = (this.toY-this.y) / this.duration;

    console.log("dx = "+dx+" , dy = "+dy);
    var x = this.x;
    var y = this.y;
    var elapsed = 0;
    this.interval = setInterval(function() {
      if(elapsed >= _this.duration)
        _this.destroy();
      _this.graphics.clear();
      _this.graphics.lineStyle(5, 0xFFFFFF, 1);
      x += dx;
      y += dy;
      _this.graphics.moveTo(x, y);
      _this.graphics.lineTo(x + dx * _this.length, y + dy * _this.length);
      elapsed++;
    }, delta);
  };

  this.destroy = function() {
    clearInterval(this.interval);
    this.container.removeChild(this.graphics);
  };

  container.addChild(this.graphics);
};