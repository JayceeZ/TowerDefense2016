/**
 * Represents the map
 */

var Map = function Map(container) {
  this.turrets = [];
  this.enemies = [];
  this.container = container;

  this.addTurret = function(x, y, orientation) {
    var t = new Turret(this.turrets.length, this.container);
    t.setPosition(x, y);
    t.setOrientation(orientation);
    this.turrets.push(t);
  };

  this.addEnemy = function(x, y) {
    var e =  new Enemy(this.enemies.length, this.container);
    e.setPosition(x, y);
    this.enemies.push(e);
  };
};