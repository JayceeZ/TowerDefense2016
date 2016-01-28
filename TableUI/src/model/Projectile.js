
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
    console.log("Projectile fired");

    var distance = Math.sqrt(Math.pow(this.toX-this.x,2)+Math.pow(this.toY-this.y,2));
    this.speed = distance / (this.duration * delta);
    var dx = (this.toX-this.x) / distance;
    var dy = (this.toY-this.y) / distance;
    var x = this.x;
    var y = this.y;
    var elapsed = 0;
    this.interval = setInterval(function() {
      elapsed += _this.speed;
      x += dx * _this.speed * elapsed;
      y += dy * _this.speed * elapsed;
      if(Math.sqrt(Math.pow(x-_this.x,2)+Math.pow(y-_this.y,2)) >= distance)
        _this.destroy();
      _this.graphics.clear();
      _this.graphics.lineStyle(5, 0xFFFFFF, 1);
      _this.graphics.moveTo(x, y);
      _this.graphics.lineTo(x + dx * _this.length, y + dy * _this.length);
    }, this.speed);
  };

  this.destroy = function() {
    clearInterval(this.interval);
    this.container.removeChild(this.graphics);
  };

  container.addChild(this.graphics);
};