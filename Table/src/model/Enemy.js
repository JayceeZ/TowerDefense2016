/**
 * Represents an enemy
 */

var Enemy = function Enemy(id) {
  this.id = id;
  this.life = 0;
  this.x = 0;
  this.y = 0;
  this.graphics = new PIXI.Graphics();

  this.setLife = function(life) {
    this.life = life;
  };

  this.isDead = function() {
    return life === 0;
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

