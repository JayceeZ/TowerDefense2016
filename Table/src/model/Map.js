/**
 * Represents the map
 */

var Map = function Map(renderer) {
  this.turrets = [];
  this.enemies = [];

  this.setRenderer = function(renderer) {
    this.renderer = renderer;
  };

  this.addTurret = function(turret) {
    this.turrets.push(turret);
  };

  this.addEnemy = function(enemy) {
    this.enemies.push(enemy);
  };

  this.renderer = renderer;
};