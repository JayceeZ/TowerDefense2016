/**
 * Represents an enemy
 */

var Enemy = function Enemy(id) {
  this.id = id;
  this.life = 0;
  this.graphics = new PIXI.Graphics();

  this.setLife = function(life) {
    this.life = life;
  };

  this.isDead = function() {
    return life === 0;
  }

  this.update = function() {
    this.graphics.lineStyle(0);
    this.graphics.beginFill(0xFFCC00, 1);
    this.graphics.drawCircle(100,100,20);
    this.graphics.endFill();
  }
};

