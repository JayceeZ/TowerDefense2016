/**
 * Represents an enemy
 */

var Enemy = function Enemy(id) {
  this.id = id;
  this.life = 0;

  this.setLife = function(life) {
    this.life = life;
  };

  this.isDead = function() {
    return life === 0;
  }
};

