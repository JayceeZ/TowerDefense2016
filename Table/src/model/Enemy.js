/**
 * Represents an enemy
 */

var Enemy = function Enemy(id, container) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.positions = undefined;
  this.directions = undefined;
  this.dead = undefined;
  this.speed = 2;

  this.container = container;
  this.graphics = new PIXI.Graphics();

  this.setPosition = function(x,y) {
    this.x = x;
    this.y = y;
  };

  this.setPoints = function(points) {
    this.points = points;
  };

  this.setDirections = function(directions) {
    this.directions = directions;
  };

  this.kill = function(t) {
    this.dead = t;
  };

  this.step = function(t) {
    if(this.dead === t)
      this.destroy();
    if(this.directions && this.positions) {
      // Move to next point if point reached
      var pos = this.positions[this.indexPosition];
      var direction = this.directions[this.indexPosition];
      if(pos && direction) {
        this.setPosition(this.x + this.speed*direction.vx, this.y + this.speed*direction.vy);
      }
    }
  };

  this.destroy = function() {
    this.container.removeChild(this.graphics);
  };

  this.update = function() {
    this.step();
    this.graphics.clear();
    this.graphics.lineStyle(0);
    this.graphics.beginFill(0xFFCC00, 1);
    this.graphics.drawCircle(this.x, this.y, 20);
    this.graphics.endFill();
  };

  this.container.addChild(this.graphics);
};

