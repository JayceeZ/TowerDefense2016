/**
 * Represents an enemy
 */

var Enemy = function Enemy(id, container) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.points = undefined;
  this.directions = undefined;
  this.dead = undefined;
  this.speed = 2;

  this.index = 0;

  this.container = container;
  this.graphics = new PIXI.Graphics();

  this.setPosition = function(x,y) {
    this.x = x;
    this.y = y;
    this.update();
  };

  this.setPoints = function(points) {
    this.points = points;
  };

  this.setDirections = function(directions) {
    this.directions = directions;
  };

  this.setSpeed = function(speed) {
    this.speed = speed;
  };

  this.kill = function(t) {
    console.log("Enemy "+this.id + " will die at "+t);
    this.dead = t;
  };

  this.updateModel = function(t) {
    if(this.dead === t) {
      console.log("Enemy destroyed at "+t);
      this.destroy();
    }

    if(this.index < this.points.length) {
      var pos = this.points[this.index];
      var direction = this.directions[this.index];

      if (this.x === pos.x && this.y === pos.y)
        this.index += 1;

      if (pos && direction)
        this.setPosition(this.x + this.speed * direction.vx, this.y + this.speed * direction.vy);
    }
    return this.index;
  };

  this.destroy = function() {
    this.container.removeChild(this.graphics);
  };

  this.update = function() {
    this.graphics.clear();
    this.graphics.lineStyle(0);
    this.graphics.beginFill(0xFF0000, 1);
    this.graphics.drawCircle(this.x, this.y, 20);
    this.graphics.endFill();
  };

  this.container.addChild(this.graphics);
};

