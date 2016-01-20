/**
 * Represents the map
 */

var Map = function Map() {
  this.turrets = [];
  this.enemies = [];
  this.boundaries = new ClientRect();

  this.addTurret = function(turret) {
    this.turrets.push(turret);
  };

  this.addEnemy = function(enemy) {
    this.enemies.push(enemy);
  };
};